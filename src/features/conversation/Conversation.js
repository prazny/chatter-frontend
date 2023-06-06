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

export class Conversation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.nickname,
      customerUUID: this.props.customerUUID,
      yourName: this.props.yourName,
      message: "",
      messages: [],
      ws: new Socket(this.pushMessage, this.props.customerUUID),
    };

    //this.repo = new SimpleRepository();
    // this.updateRoom();
    //this.uploadInput = React.createRef(null);

    //socket.on("push-message", this.pushMessage);
    //socket.on("push-info", this.pushInfo);
    //socket.on("push-image", this.pushImage);
    //socket.on("typing", this.typing);
  }

  pushMessage = (message) => {
    if (message.from == null) message.from = this.props.nickname;

    this.setState((current) => ({
      messages: [...current.messages, { type: "message", content: message }],
    }));
    console.log(this.state.messages);
  };
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
  //   typing = (message) => {
  //     if (!this.state.typiers.includes(message.from)) {
  //       this.setState((current) => ({
  //         typiers: [...current.typiers, message.from],
  //       }));
  //     }

  //     setTimeout(() => {
  //       this.setState((current) => ({
  //         typiers: [],
  //       }));
  //     }, 5000);
  //   };
  //
  // componentDidUpdate(prevProps) {
  //     if (prevProps.slug !== this.props.slug) {
  //         //this.updateRoom();
  //     }
  // }

  /*updateRoom() {
        if (this.props.slug !== null) {
            this.repo.getRoom(this.props.slug).then((data) => {
                this.setState({ room: data });
                this.setState({ messages: [] });
                console.log(this.state.room);
            });
        }
    }*/

  getTime = () => {
    let date = new Date();
    return date.toUTCString();
  };

  handleChange = (event) => {
    this.setState({ message: event.target.value });
    this.setState({ isTyping: true });

    setTimeout(() => {
      this.setState({ isTyping: false });
    }, 3000);

    //   socket.emit("typing");
  };
  //
  // handleUpload = (event) => {
  //     console.log("started up");
  //     socket.emit("upload", event.target.files[0]);
  // };
  //
  handleSubmit = (event) => {
    let date = this.getTime();
    this.state.ws.send({
      message: this.state.message,
      userTo: this.state.customerUUID,
      date: date,
    });
    this.pushMessage({
      message: this.state.message,
      from: this.state.yourName,
      time: date,
    });
    this.setState({ message: "" });
    event.preventDefault();
  };

  render() {
    return (
      <Box>
        <List
          sx={{
            height: "68vh",
            overflowY: "auto",
          }}
        >
          {this.state.messages.map((el, index) => {
            return el.type === "message" ? (
              <Message
                isMe={el.content.from === this.state.yourName}
                message={el.content}
                key={index}
              />
            ) : el.type === "info" ? (
              <Info message={el.content} key={index} />
            ) : (
              <Image
                isMe={el.content.from === this.state.yourName}
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
            <form onSubmit={this.handleSubmit}>
              <TextField
                type="input"
                onChange={this.handleChange}
                value={this.state.message}
                id="outlined-basic-email"
                label="Type message"
                fullWidth
              />
            </form>
          </Grid>
          <Grid item xs={1} align="right" marginLeft={2}>
            <Fab onClick={this.handleSubmit} color="primary" aria-label="add">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
    );
  }
}
