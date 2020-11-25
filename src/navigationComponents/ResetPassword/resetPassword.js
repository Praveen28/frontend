import React from "react";
import { Button, Paper, TextField, Typography } from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import axios from "axios";
import "./resetPassword.css";

class ResetPassword extends React.Component {
  state = {
    emailid: "",
  };

  updatePassword = () => {
    if (!this.state.emailid) {
      alert("Enter emailid");
    }
    axios
      .post("/organic/reset", { emailid: this.state.emailid })
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <React.Fragment>
        <AppBar />
        <div style={{ marginTop: "2%", textAlign: "center" }}>
          <Paper className='reset_paper' elevation={20}>
            <Typography style={{ textAlign: "center", margin: "1%" }}>
              ORGANIC FARMING
            </Typography>
            <TextField
              variant='outlined'
              fullWidth
              label='Email-Id'
              style={{ width: "90%" }}
              onChange={(e) =>
                this.setState({ emailid: e.currentTarget.value })
              }
            />
            <Button
              style={{
                alignItems: "center",
                justifyContent: "center",
                margin: "1%",
                height: 50,
              }}
              variant='contained'
              color='secondary'
              onClick={() => this.updatePassword()}>
              UPDATE PASSWORD
            </Button>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

export default ResetPassword;
