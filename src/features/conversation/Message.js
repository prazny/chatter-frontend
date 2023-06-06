import React from "react";
import { Grid, ListItem, ListItemText, Box, Typography } from "@mui/material";

export class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
      isMe: this.props.isMe,
    };

    this.align = this.state.isMe ? "right" : "left";
  }

  render() {
    if (this.state.isMe) {
      return (
        <ListItem key="2">
          <Grid container justifyContent="flex-end">
            <Grid item xs={5} md={8} display={"flex"} justifyContent="flex-end">
              <Box
                sx={{
                  backgroundColor: "#003356",
                  borderRadius: "20px",
                  display: "inline-block",
                  paddingLeft: "20px",
                }}
              >
                <Box item xs={12} pr={2}>
                  <ListItemText
                    align={this.align}
                    primary={
                      <Typography variant="body1" style={{ color: "#FFFFFF" }}>
                        {this.state.message.message}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      style: {
                        overflowWrap: "break-word",
                        padding: "10px",
                      },
                    }}
                  ></ListItemText>
                </Box>
                <Box item xs={12} pr={2}>
                  <ListItemText
                    align={this.align}
                    secondary={
                      <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                        {this.state.message.from +
                          ", " +
                          this.state.message.time}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ListItem>
      );
    } else {
      return (
        <ListItem key="2">
          <Grid container justifyContent="flex-start">
            <Grid
              item
              xs={5}
              md={8}
              display={"flex"}
              justifyContent="flex-start"
            >
              <Box
                sx={{
                  backgroundColor: "#660000",
                  borderRadius: "20px",
                  display: "inline-block",
                  paddingRight: "20px",
                }}
              >
                <Box item xs={12} pl={2}>
                  <ListItemText
                    align={this.align}
                    primary={
                      <Typography variant="body1" style={{ color: "#FFFFFF" }}>
                        {this.state.message.message}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      style: {
                        overflowWrap: "break-word",
                        padding: "10px",
                      },
                    }}
                  ></ListItemText>
                </Box>
                <Box item xs={12} pl={2}>
                  <ListItemText
                    align={this.align}
                    secondary={
                      <Typography variant="body2" style={{ color: "#FFFFFF" }}>
                        {this.state.message.from +
                          ", " +
                          this.state.message.time}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
  }
}
