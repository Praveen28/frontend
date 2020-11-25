import React from "react";
import "./profilePage.css";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Tab,
  Tabs,
  Divider,
  TextField,
  Button,
  Modal,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";

import { Person, AllInbox, ArrowForwardIosSharp } from "@material-ui/icons";
import AppBar from "../../components/AppBar/AppBar";

function TabPanel(props) {
  return (
    <div role='tabpanel' hidden={props.value !== props.index}>
      {props.value === props.index && (
        <Typography>{props.children} </Typography>
      )}
    </div>
  );
}

class ProfilePage extends React.Component {
  state = {
    value: 0,
    username: "",
    address: "",
    district: "",
    landmark: "",
    mobilenumber: "",
    pincode: "",
    state: "",
    status: "",
    emailid: "",
    password: "",
    profileedit: false,
    addressedit: false,
    visible: false,
    loading: false,
  };

  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (JSON.parse(login) === null) {
      return <Button>Return to login page</Button>;
    } else {
      this.setState({ loading: true });
      const id = {
        id: JSON.parse(login).id,
      };
      axios
        .post("/organic/login/getuser", id)
        .then((res) => {
          setTimeout(() => {
            this.setState({
              username: res.data[0].username,
              address: res.data[0].address,
              district: res.data[0].district,
              landmark: res.data[0].landmark,
              mobilenumber: res.data[0].mobilenumber,
              emailid: res.data[0].emailid,
              pincode: res.data[0].pincode,
              state: res.data[0].state,
              status: res.data[0].status,
              loading: false,
            });
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  }

  handleTab = (e, newValue) => {
    console.log(newValue);
    this.setState({
      value: newValue,
    });
  };

  updateProfile = () => {
    const login = localStorage.getItem("loggedin");
    const pattern = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!pattern.test(this.state.emailid)) {
      alert("Enter an correct email id");
    } else if (this.state.mobilenumber.length !== 10) {
      alert("Mobile number should be only 10 digits.");
    } else {
      this.setState({ loading: true });
      const data = {
        id: JSON.parse(login).id,
        emailid: this.state.emailid,
        username: this.state.username,
        mobilenumber: this.state.mobilenumber,
      };
      axios
        .post("/organic/update/profileupdate", data)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false, profileedit: false });
            alert(res.data);
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  deleteAccount = () => {
    if (!this.state.password) {
      alert("Fill the password to delete your account");
    } else {
      this.setState({ loading: true });
      const login = localStorage.getItem("loggedin");
      const data = {
        id: JSON.parse(login).id,
        password: this.state.password,
      };
      axios
        .post("/organic/update/deleteprofile", data)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false });
            if (res.data.status === 0) {
              alert(res.data.message);
            } else {
              alert(res.data.message);
              localStorage.clear();
              this.props.history.push("/");
            }
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };

  updateAddress = () => {
    if (
      !this.state.district ||
      !this.state.state ||
      !this.state.pincode ||
      !this.state.address ||
      !this.state.landmark
    ) {
      alert("Fill in all the details..");
    } else if (this.state.pincode.length !== 6) {
      alert("Pincode should contain only 6 digits");
    } else if (!parseInt(this.state.pincode.match(/^[0-9]+$/))) {
      alert("Numbers should only be entered in pincode");
    } else {
      this.setState({ loading: true });
      const login = localStorage.getItem("loggedin");
      const data = {
        id: JSON.parse(login).id,
        district: this.state.district,
        state: this.state.state,
        address: this.state.address,
        pincode: this.state.pincode,
        landmark: this.state.landmark,
      };
      axios
        .post("/organic/update/updateaddress", data)
        .then((Res) => {
          setTimeout(() => {
            this.setState({ loading: false, addressedit: false });
            alert(Res.data);
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    const login = localStorage.getItem("loggedin");
    const disable = this.state.addressedit === false;
    return (
      <div style={{ backgroundColor: "#EEF1EC", minHeight: "100vh" }}>
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
          <Container maxWidth='lg'>
            <br />
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <Paper style={{ maxWidth: 290 }}>
                  <div style={{ display: "flex" }}>
                    <Avatar
                      className='profile_avatar'
                      alt='image'
                      src='https://www.kindpng.com/picc/m/22-223941_transparent-avatar-png-male-avatar-icon-transparent-png.png'
                    />
                    <Typography>
                      &nbsp;Hello,
                      <br />
                      &nbsp;<b>{JSON.parse(login).username} </b>
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item md={3} xs={12}>
                <Paper>
                  <div
                    style={{
                      display: "flex",
                      padding: "3%",
                      cursor: "pointer",
                    }}
                    onClick={() => this.props.history.push("/account/orders")}>
                    <AllInbox style={{ fontSize: "30px", color: "#AE154D" }} />
                    <Typography style={{ flexGrow: 1 }}>
                      &nbsp;&nbsp;&nbsp;&nbsp; ORDERS
                    </Typography>
                    <ArrowForwardIosSharp />
                    <br />
                  </div>
                  <Divider />
                  <div style={{ display: "flex", padding: "3%" }}>
                    <Person style={{ fontSize: "30px", color: "#AE154D" }} />
                    <Typography>
                      &nbsp;&nbsp;&nbsp;&nbsp; ACCOUNT SETTINGS
                    </Typography>
                    <br />
                  </div>
                  <Divider />
                  <Tabs
                    variant='fullWidth'
                    value={this.state.value}
                    onChange={this.handleTab}
                    orientation='vertical'
                    indicatorColor='primary'>
                    <Tab label='Profile Information' />

                    <Divider />
                    <Tab label='Manage Address' />
                  </Tabs>
                </Paper>
              </Grid>
              <Grid item md={9} xs={12}>
                <TabPanel value={this.state.value} index={0}>
                  <Paper style={{ padding: "2%" }} elevation={10}>
                    <Typography component={"span"} variant={"body2"}>
                      <b>Personal Information</b>
                    </Typography>
                    <br />
                    <br />
                    <Grid container spacing={10}>
                      <Grid item md={6} xs={12}>
                        {this.state.profileedit === false ? (
                          <React.Fragment>
                            <TextField
                              disabled
                              variant='outlined'
                              fullWidth
                              value={this.state.username}
                              label='Username'
                            />
                            <br />
                            <br />
                            <Typography>
                              <b>Email Id </b>
                            </Typography>
                            <br />
                            <TextField
                              disabled
                              label='EmailId'
                              fullWidth
                              variant='outlined'
                              value={this.state.emailid}
                            />
                            <br />
                            <br />
                            <Typography>
                              <b>Mobile Number </b>
                            </Typography>
                            <br />
                            <TextField
                              fullWidth
                              disabled
                              variant='outlined'
                              value={this.state.mobilenumber}
                              label='Mobile Number'
                            />
                            <br />
                            <br />
                            <Button
                              variant='contained'
                              color='secondary'
                              onClick={() =>
                                this.setState({ profileedit: true })
                              }>
                              EDIT
                            </Button>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <TextField
                              variant='outlined'
                              fullWidth
                              value={this.state.username}
                              label='Username'
                              onChange={(e) =>
                                this.setState({
                                  username: e.currentTarget.value,
                                })
                              }
                            />
                            <br />
                            <br />
                            <Typography>
                              <b>Email Id </b>
                            </Typography>
                            <br />
                            <TextField
                              label='EmailId'
                              fullWidth
                              variant='outlined'
                              value={this.state.emailid}
                              onChange={(e) =>
                                this.setState({
                                  emailid: e.currentTarget.value,
                                })
                              }
                            />
                            <br />
                            <br />
                            <Typography>
                              <b>Mobile Number </b>
                            </Typography>
                            <br />
                            <TextField
                              fullWidth
                              variant='outlined'
                              value={this.state.mobilenumber}
                              label='Mobile Number'
                              onChange={(e) =>
                                this.setState({
                                  mobilenumber: e.currentTarget.value,
                                })
                              }
                            />
                            <br />
                            <br />
                            <div style={{ display: "flex" }}>
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => this.updateProfile()}>
                                SAVE
                              </Button>
                              <Button
                                color='secondary'
                                onClick={() =>
                                  this.setState({ profileedit: false })
                                }>
                                CANCEL
                              </Button>
                            </div>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                    <br />
                    <Grid item xs={12}>
                      <Typography>
                        <b>FAQs</b>
                      </Typography>
                      <br />
                      <Typography>
                        <b>
                          What happens when I update my email address (or mobile
                          number)?
                        </b>
                        <br />
                        Your login email id (or mobile number) changes,
                        likewise. You'll receive all your account related
                        communication on your updated email address (or mobile
                        number).
                      </Typography>
                      <br />
                      <Typography>
                        <b>
                          When will my Organic Farming account be updated with
                          the new email address (or mobile number)?
                        </b>
                        <br />
                        It happens as soon as you confirm the verification code
                        sent to your email (or mobile) and save the changes.
                      </Typography>
                      <br />
                      <Typography>
                        <b>
                          What happens to my existing Organic Farming account
                          when I update my email address (or mobile number)?
                        </b>
                        <br />
                        Updating your email address (or mobile number) doesn't
                        invalidate your account. Your account remains fully
                        functional. You'll continue seeing your Order history,
                        saved information and personal details.
                      </Typography>
                      <br />
                      <Typography>
                        <b>
                          Does my Seller account get affected when I update my
                          email address?
                        </b>
                        <br />
                        Organic Farming has a 'single sign-on' policy. Any
                        changes will reflect in your Seller account also.
                      </Typography>
                      <br />
                      <br />
                      <Button
                        color='primary'
                        style={{ textTransform: "none" }}
                        onClick={() => this.setState({ visible: true })}>
                        <Typography>Deactivate Account</Typography>
                      </Button>
                      <Modal
                        open={this.state.visible}
                        onClose={() => this.setState({ visible: false })}>
                        <Paper className='profile_modal'>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <div style={{ padding: "5%" }}>
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    textAlign: "justify",
                                  }}>
                                  <b>When you deactivate your account</b>
                                  <ul>
                                    <li>
                                      You are logged out of your Organic Framing
                                      Account
                                    </li>
                                    <li>
                                      Your public profile on Organic Framing is
                                      no longer visible
                                    </li>
                                    <li>
                                      Your reviews/ratings are still visible,
                                      while your profile information is shown as
                                      ‘unavailable’ as a result of deactivation.
                                    </li>
                                    <li>
                                      Your wishlist items are no longer
                                      accessible through the associated public
                                      hyperlink. Wishlist is shown as
                                      ‘unavailable’ as a result of deactivation
                                    </li>
                                    <li>
                                      You will be unsubscribed from receiving
                                      promotional emails from Flipkart
                                    </li>
                                    <li>
                                      Your account data is retained and is
                                      restored in case you choose to reactivate
                                      your account
                                    </li>
                                  </ul>
                                </Typography>
                                <br />
                                <Typography
                                  style={{
                                    fontSize: 15,
                                    textAlign: "justify",
                                  }}>
                                  <b>
                                    How do I reactivate my Organic Farming
                                    account?
                                  </b>
                                  <br />
                                  <br />
                                  Reactivation is easy.
                                  <br />
                                  <br />
                                  Simply login with your registered email id or
                                  mobile number and password combination used
                                  prior to deactivation. Your account data is
                                  fully restored. Default settings are applied
                                  and you will be subscribed to receive
                                  promotional emails from Flipkart.
                                  <br />
                                  <br />
                                  Flipkart retains your account data for you to
                                  conveniently start off from where you left, if
                                  you decide to reactivate your account.
                                  <br />
                                  <br />
                                  <b>
                                    Remember: Account Reactivation can be done
                                    on the Desktop version only.
                                  </b>
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <div style={{ padding: "5%" }}>
                                <h3>Are you sure to leave ?</h3>
                                <br />
                                <TextField
                                  variant='outlined'
                                  fullWidth
                                  disabled
                                  value={this.state.username}
                                />
                                <br />
                                <br />
                                <TextField
                                  variant='outlined'
                                  fullWidth
                                  disabled
                                  value={this.state.mobilenumber}
                                />
                                <br />
                                <br />
                                <TextField
                                  variant='outlined'
                                  label='Password'
                                  fullWidth
                                  type='password'
                                  value={this.state.password}
                                  onChange={(e) =>
                                    this.setState({
                                      password: e.currentTarget.value,
                                    })
                                  }
                                />
                                <br />
                                <br />
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='primary'
                                  onClick={() => this.deleteAccount()}>
                                  CONFIRM DEACTIVATION
                                </Button>
                                <br />
                                <br />
                                <Button
                                  color='primary'
                                  fullWidth
                                  onClick={() =>
                                    this.setState({ visible: false })
                                  }>
                                  NO, LET ME STAY!
                                </Button>
                              </div>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Modal>
                    </Grid>
                    <br />
                    <br />
                    <img
                      alt='profileinfo'
                      className='profileinfo_image'
                      src='https://i.ya-webdesign.com/images/farmland-vector-agricultural-land-3.png'
                    />
                  </Paper>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                  <Paper>
                    <div style={{ padding: "3%" }}>
                      <Typography>
                        <b>Manage Address</b>
                      </Typography>
                      <br />
                      <Grid container spacing={3}>
                        <Grid item md={12}>
                          <b>Username</b>
                          <br />
                          <TextField
                            variant='outlined'
                            disabled
                            value={this.state.username}
                          />
                          <br />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <b>Address</b>
                          <TextField
                            variant='outlined'
                            multiline
                            rows={4}
                            value={this.state.address}
                            disabled={disable}
                            fullWidth
                            onChange={(e) =>
                              this.setState({ address: e.currentTarget.value })
                            }
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <b>District</b>
                          <TextField
                            variant='outlined'
                            value={this.state.district}
                            disabled={disable}
                            fullWidth
                            onChange={(e) =>
                              this.setState({ district: e.currentTarget.value })
                            }
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <b>State</b>
                          <TextField
                            variant='outlined'
                            value={this.state.state}
                            disabled={disable}
                            fullWidth
                            onChange={(e) =>
                              this.setState({ state: e.currentTarget.value })
                            }
                          />
                        </Grid>

                        <Grid item md={4} xs={12}>
                          <b>Pincode</b>
                          <TextField
                            variant='outlined'
                            value={this.state.pincode}
                            disabled={disable}
                            fullWidth
                            onChange={(e) =>
                              this.setState({ pincode: e.currentTarget.value })
                            }
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <b>Landmark</b>
                          <TextField
                            variant='outlined'
                            value={this.state.landmark}
                            disabled={disable}
                            fullWidth
                            onChange={(e) =>
                              this.setState({ landmark: e.currentTarget.value })
                            }
                          />
                        </Grid>
                        {this.state.addressedit === false ? (
                          <Grid item xs={3}>
                            <Button
                              fullWidth
                              variant='contained'
                              color='primary'
                              onClick={() =>
                                this.setState({ addressedit: true })
                              }>
                              EDIT
                            </Button>
                          </Grid>
                        ) : (
                          <React.Fragment>
                            <Grid item xs={3}>
                              <Button
                                fullWidth
                                variant='contained'
                                color='primary'
                                onClick={() => this.updateAddress()}>
                                SAVE
                              </Button>
                            </Grid>
                            <Grid item xs={2}>
                              <Button
                                color='primary'
                                onClick={() =>
                                  this.setState({ addressedit: false })
                                }>
                                CANCEL
                              </Button>
                            </Grid>
                          </React.Fragment>
                        )}
                      </Grid>
                    </div>
                    <br />
                    <br />
                    <img
                      alt='profileinfo'
                      className='profileinfo_image'
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUd2QsKhwVl_c30xSq6MgitQ3evUCHEGbLzw&usqp=CAU'
                    />
                  </Paper>
                </TabPanel>
              </Grid>
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}

export default ProfilePage;
