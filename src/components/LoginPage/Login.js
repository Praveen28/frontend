import React from "react";
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  CircularProgress,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import axios from "axios";
import { Person, Lock } from "@material-ui/icons";
import "./Login.css";
import state from "./state_dist.json";

class Login extends React.Component {
  state = {
    emailid: "",
    password: "",
    loading: false,
    visible: false,
    acc_name: "",
    acc_email: "",
    acc_mobno: "",
    acc_state: "",
    acc_dist: "",
    acc_pincode: "",
    acc_address: "",
    acc_password: "",
  };

  componentDidMount() {
    var login = localStorage.getItem("loggedin");
    if (JSON.parse(login) != null) {
      alert("You are logged in");
      this.props.history.push("/");
    }
  }

  handleUsername = (e) => {
    this.setState({
      emailid: e.currentTarget.value,
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  openModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleLogin = () => {
    const login = {
      emailid: this.state.emailid,
      password: this.state.password,
    };
    if (!this.state.emailid || !this.state.password) {
      alert("Fill all the details");
    } else {
      this.setState({ loading: true });
      axios.post(`${URL}/organic/login`, login).then((res) => {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
          if (!res.data.length) {
            alert("No data found");
          } else {
            const data = {
              username: res.data[0].username,
              status: res.data[0].status,
              id: res.data[0]._id,
            };
            localStorage.setItem("loggedin", JSON.stringify(data));
            if (res.data[0].status === "1") {
              this.props.history.push("/login/admin");
            } else if (res.data[0].status === "2") {
              this.props.history.goBack();
            }
          }
        }, 4000);
      });
    }
  };

  newAccState = (e) => {
    this.setState({ acc_state: e.target.value });
  };

  newAccDist = (e) => {
    this.setState({ acc_dist: e.target.value });
  };

  createAccount = () => {
    var data = {
      name: this.state.acc_name,
      email: this.state.acc_email,
      mobileno: this.state.acc_mobno,
      state: this.state.acc_state,
      district: this.state.acc_dist,
      pincode: this.state.acc_pincode,
      address: this.state.acc_address,
      password: this.state.acc_password,
    };

    var mailformat = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

    if (
      !data.email ||
      !data.name ||
      !data.mobileno ||
      !data.state ||
      !data.district ||
      !data.pincode ||
      !data.address
    ) {
      alert("Fill in all the details ");
    } else if (isNaN(data.mobileno) && data.mobileno.length !== 10) {
      alert("Mobile number format in wrong");
      document.getElementById("mobileno").focus();
    } else if (!data.email.match(mailformat)) {
      alert("Email-Id is not correct");
      document.getElementById("emailid").focus();
    } else if (isNaN(data.pincode) && data.pincode.length !== 6) {
      alert("Pincode is not in correct format");
      document.getElementById("pincode").focus();
    } else {
      axios.post(`${URL}/organic/login/adduser`, data).then((res) => {
        alert(res.data);
        window.location.reload(false);
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <AppBar />
        {this.state.loading === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              alignItems: "center",
              height: "80vh",
            }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid item md={8}>
              <div className='login_div'>
                <img
                  alt='login'
                  src='https://kit8.net/images/thumbnails/580/386/detailed/3/Guy_and_computer@2x.png'
                  className='login_image'
                />
                <Typography className='login_title'>ORGANIC FARMING</Typography>
              </div>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper className='login_paper' elevation={10}>
                <div style={{ backgroundColor: "#327210" }}>
                  <br />
                  <Typography className='login_subtitle'>LOGIN</Typography>
                  <br />
                </div>
                <br />
                <div style={{ marginRight: "2%", marginLeft: "2%" }}>
                  <form>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <Person className='login_icons' />
                      </Grid>
                      <Grid item xs={11}>
                        <TextField
                          variant='outlined'
                          fullWidth
                          label='Email-Id'
                          value={this.state.emailid}
                          onChange={(e) => this.handleUsername(e)}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <Lock className='login_icons' />
                      </Grid>
                      <Grid item xs={11}>
                        <TextField
                          variant='outlined'
                          fullWidth
                          type='password'
                          label='Password'
                          autoComplete='true'
                          value={this.state.password}
                          onChange={(e) => this.handlePassword(e)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant='outlined'
                          onClick={() => this.handleLogin()}>
                          LOGIN
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          variant='outlined'
                          onClick={() =>
                            this.props.history.push("/reset-password")
                          }>
                          FORGOT PASSWORD
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                  <br />
                  <Typography
                    className='new_account'
                    onClick={() => this.openModal()}>
                    New to Organic Farming? Create a new account
                  </Typography>
                  <br />
                </div>
              </Paper>
            </Grid>
          </Grid>
        )}
        <Modal
          open={this.state.visible}
          onClose={() => this.setState({ visible: false })}>
          <Paper className='newacc_modal'>
            <Typography className='new_account'>
              CREATE AN ACCOUNT TO ENJOY THE SHOPPING
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <TextField
                  id='username'
                  fullWidth
                  variant='outlined'
                  label='Name'
                  onChange={(e) =>
                    this.setState({ acc_name: e.currentTarget.value })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id='emailid'
                  fullWidth
                  variant='outlined'
                  label='Email-Id'
                  onChange={(e) =>
                    this.setState({ acc_email: e.currentTarget.value })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id='mobileno'
                  fullWidth
                  variant='outlined'
                  label='Mobile Number'
                  onChange={(e) =>
                    this.setState({ acc_mobno: e.currentTarget.value })
                  }
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>State</InputLabel>
                  <Select onChange={(e) => this.newAccState(e)} label='State'>
                    <MenuItem selected>Choose the state</MenuItem>
                    {state.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item.state}>
                          {item.state}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>District</InputLabel>
                  <Select onChange={this.newAccDist} label='District'>
                    <MenuItem selected>Choose the district</MenuItem>
                    {state
                      .filter((state) => state.state === this.state.acc_state)
                      .map((item, index) => {
                        return item.districts.map((a, b) => {
                          return (
                            <MenuItem key={index} value={a}>
                              {a}
                            </MenuItem>
                          );
                        });
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id='pincode'
                  fullWidth
                  variant='outlined'
                  label='Pincode'
                  onChange={(e) =>
                    this.setState({ acc_pincode: e.currentTarget.value })
                  }
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id='password'
                  fullWidth
                  variant='outlined'
                  label='Password'
                  onChange={(e) =>
                    this.setState({ acc_password: e.currentTarget.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows='5'
                  variant='outlined'
                  label='Address'
                  onChange={(e) =>
                    this.setState({ acc_address: e.currentTarget.value })
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  onClick={() => this.createAccount()}>
                  REGISTER
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
