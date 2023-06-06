import React from "react";
import {
  Avatar,
  Box,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: this.props.message,
    };
  }

  render() {
    return (
      <ListItem key="2">
        <Grid container justifyContent="flex-center">
          <Grid item xs={12} pr={2}>
            <ListItemText
              align="center"
              primary={this.state.message.message}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}
