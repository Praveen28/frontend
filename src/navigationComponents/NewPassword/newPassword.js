import React from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import axios from "axios";
import "./newPassword.css";

class NewPassword extends React.Component {
  state = {
    newpassword: "",
  };
  newPassword = () => {
    axios
      .post("/organic/reset/new-password", {
        token: this.props.match.params.token,
        newpassword: this.state.newpassword,
      })
      .then((res) => {
        alert(res.data);
        this.props.history.push("/login");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <div style={{ marginTop: "5%", textAlign: "center" }}>
          <Paper elevation={15} className='newpassword_paper'>
            <Typography
              style={{
                textAlign: "center",
                letterSpacing: "0.2em",
                margin: "1%",
              }}>
              NEW PASSWORD
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              label='New Password'
              style={{ width: "90%" }}
              onChange={(e) =>
                this.setState({ newpassword: e.currentTarget.value })
              }
            />
            <Button
              variant='outlined'
              color='primary'
              style={{ margin: "1%", textAlign: "center" }}
              onClick={() => this.newPassword()}>
              SET NEW PASSWORD
            </Button>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default NewPassword;
