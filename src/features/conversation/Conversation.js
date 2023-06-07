import React from "react";
import {
  Box,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
  ListItemText,
} from "@mui/material";
import { Socket } from "../socket/Socket";
import { Message } from "./Message";
import { Info } from "./Info";
import { Image } from "./Image";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { useGetMessagesQuery } from "../../services/chats";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";

export default function Conversation(props) {
  // constructor(props) {

  //   console.log(this.props.nickname);

  //   console.log(this.state.historyMessages);

  //   //this.repo = new SimpleRepository();
  //   //this.uploadInput = React.createRef(null);
  // }

  const [nickname, setNick] = useState("");
  const [customerUUID, setUUID] = useState("");
  const [yourName, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistory] = useState([]);
  const [chatToken, setToken] = useState("");
  const [ws, setWs] = useState(null);

  const { id } = useParams();
  const messagesHistory = useGetMessagesQuery(id);

  const pushMessage = (message) => {
    // console.log(message);
    if (message.from == null) message.from = nickname;

    setMessages((current) => [
      ...current,
      { type: "message", content: message },
    ]);

    console.log(messages);
  };

  // console.log(messagesHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    setNick(props.nicknameProp);
    setUUID(props.UUIDProp);
    setName(props.nameProp);
    setMessage("");
    setMessages([]);
    setHistory([]);
    setToken(props.tokenProp);
    setWs(new Socket(pushMessage, customerUUID));
  }, []);

  if (
    !messagesHistory.isLoading &&
    messagesHistory.data.length > 0 &&
    historyMessages.length === 0
  ) {
    console.log("test");
    messagesHistory.data.map((mess) => {
      pushMessage({
        message: mess.content,
        from: mess.senderName,
        time: mess.sendDate,
      });
    });
    setHistory(messagesHistory.data);
  }

  //
  //   pushInfo = (message) => {
  //     this.setState((current) => ({
  //       messages: [...current.messages, { type: "info", content: message }],
  //     }));
  //     console.log(this.state.messages);
  //   };
  //
  // pushImage = (message) => {
  //     this.setState((current) => ({
  //         messages: [...current.messages, { type: "image", content: message }],
  //     }));
  // };
  //

  const getTime = () => {
    let date = new Date();
    return date.toUTCString();
  };

  //
  // handleUpload = (event) => {
  //     console.log("started up");
  //     socket.emit("upload", event.target.files[0]);
  // };
  //
  const handleSubmit = (event) => {
    let date = getTime();
    ws.send({
      message: message,
      userTo: customerUUID,
      senderName: yourName,
      senderType: "CONSULTANT",
      chatToken: chatToken,
      date: date,
    });
    pushMessage({
      message: message,
      from: yourName,
      time: date,
    });
    setMessage("");
    event.preventDefault();
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  return (
    <Box>
      <List
        sx={{
          height: "68vh",
          overflowY: "auto",
        }}
      >
        {messages.map((el, index) => {
          console.log(el);
          return el.type === "message" ? (
            <Message
              isMe={el.content.from === yourName}
              message={el.content}
              key={index}
            />
          ) : el.type === "info" ? (
            <Info message={el.content} key={index} />
          ) : (
            <Image
              isMe={el.content.from === yourName}
              message={el.content}
              key={index}
            />
          );
        })}
        {/* <ListItem>
            <Grid container justifyContent="flex-start">
              <Grid item xs={5} md={8}>
                <ListItemText
                  align={this.align}
                  secondary={this.state.typiers.map((elem, index) => {
                    if (index < this.state.typiers.length - 1)
                      return elem + ", ";
                    else return elem + "...";
                  })}
                  secondaryTypographyProps={{
                    style: { overflowWrap: "break-word" },
                  }}
                />
              </Grid>
            </Grid>
          </ListItem> */}
      </List>
      <Divider />
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={10}>
          <form onSubmit={handleSubmit}>
            <TextField
              type="input"
              onChange={handleChange}
              value={message}
              id="outlined-basic-email"
              label="Type message"
              fullWidth
            />
          </form>
        </Grid>
        <Grid item xs={1} align="right" marginLeft={2}>
          <Fab onClick={handleSubmit} color="primary" aria-label="add">
            <SendIcon />
          </Fab>
        </Grid>
      </Grid>
    </Box>
  );
}
