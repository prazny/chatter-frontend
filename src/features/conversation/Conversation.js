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
import {Socket} from "../socket/Socket";


export class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: null,
            nickname: this.props.nickname,
            message: "",
            messages: [],
            isTyping: false,
            ws: new Socket(),
            // typiers: [],
        };

        //this.repo = new SimpleRepository();
        // this.updateRoom();
        //this.uploadInput = React.createRef(null);

        //socket.on("push-message", this.pushMessage);
        //socket.on("push-info", this.pushInfo);
        //socket.on("push-image", this.pushImage);
        //socket.on("typing", this.typing);
    }

    // pushMessage = (message) => {
    //     this.setState((current) => ({
    //         messages: [...current.messages, { type: "message", content: message }],
    //     }));
    //     console.log(this.state.messages);
    // };
    //
    // pushInfo = (message) => {
    //     this.setState((current) => ({
    //         messages: [...current.messages, { type: "info", content: message }],
    //     }));
    //     console.log(this.state.messages);
    // };
    //
    // pushImage = (message) => {
    //     this.setState((current) => ({
    //         messages: [...current.messages, { type: "image", content: message }],
    //     }));
    // };
    //
    // typing = (message) => {
    //     if (!this.state.typiers.includes(message.from)) {
    //         this.setState((current) => ({
    //             typiers: [...current.typiers, message.from],
    //         }));
    //     }
    //
    //     setTimeout(() => {
    //         this.setState((current) => ({
    //             typiers: [],
    //         }));
    //     }, 5000);
    // };
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

    // handleChange = (event) => {
    //     this.setState({ message: event.target.value });
    //     this.setState({ isTyping: true });
    //
    //     setTimeout(() => {
    //         this.setState({ isTyping: false });
    //     }, 3000);
    //
    //     socket.emit("typing");
    // };
    //
    // handleUpload = (event) => {
    //     console.log("started up");
    //     socket.emit("upload", event.target.files[0]);
    // };
    //
    // handleSubmit = (event) => {
    //     socket.emit("send-message", this.state.message);
    //     this.setState({ message: "" });
    //     event.preventDefault();
    // };

    render() {

        return (
            <Box>

                <List
                    sx={{
                        height: "70vh",
                    }}
                >
                    {/*{this.state.messages.map((el, index) => {*/}
                    {/*    return el.type === "message" ? (*/}
                    {/*        <Message*/}
                    {/*            isMe={el.content.from === this.state.nickname}*/}
                    {/*            message={el.content}*/}
                    {/*            key={index}*/}
                    {/*        />*/}
                    {/*    ) : el.type === "info" ? (*/}
                    {/*        <Info message={el.content} key={index} />*/}
                    {/*    ) : (*/}
                    {/*        <Image*/}
                    {/*            isMe={el.content.from === this.state.nickname}*/}
                    {/*            message={el.content}*/}
                    {/*            key={index}*/}
                    {/*        />*/}
                    {/*    );*/}
                    {/*})}*/}

                </List>
                <Divider/>
                <Grid container style={{padding: "20px"}}>
                    <Grid item xs={10}>
                        <form /* onSubmit={this.handleSubmit}*/>
                            <TextField
                                type="input"
                                //onChange={this.handleChange}
                                value={this.state.message}
                                id="outlined-basic-email"
                                label="Type Something"
                                fullWidth
                            />
                        </form>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab /* onClick={this.handleSubmit} */ color="primary" aria-label="add">
                            SEND
                        </Fab>
                    </Grid>

                    {/*<Grid item xs={1} align="right">*/}
                    {/*    <Fab*/}
                    {/*        onClick={() => this.uploadInput.current.click()}*/}
                    {/*        color="primary"*/}
                    {/*        aria-label="add"*/}
                    {/*    >*/}
                    {/*        <input*/}
                    {/*            ref={this.uploadInput}*/}
                    {/*            type="file"*/}
                    {/*            id="file"*/}
                    {/*            onChange={this.handleUpload}*/}
                    {/*            style={{ display: "none" }}*/}
                    {/*        />*/}
                    {/*        <UploadFileIcon />*/}
                    {/*    </Fab>*/}
                    {/*</Grid>*/}
                </Grid>

            </Box>
        );
    }
}