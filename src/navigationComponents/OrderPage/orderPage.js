import React from "react";
import {
  Paper,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./orderPage.css";

import AppBar from "../../components/AppBar/AppBar";
import axios from "axios";
import URL from "../../config";

class Order extends React.Component {
  state = {
    data: [],
    details: [],
    username: "",
    state: "",
    pincode: "",
    mobilenumber: "",
    address: "",
    district: "",
    landmark: "",
    date: "",
    edit: false,
    loading: false,
  };

  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (this.props.location.state === undefined) {
      alert("Select one item to order");
      this.props.history.push("/allvegetables");
    } else if (JSON.parse(login) === null) {
      alert("Login in order to buy the products");
      this.props.history.push("/login");
    } else {
      this.setState({
        data: this.props.location.state,
        loading: true,
      });
      const id = {
        id: JSON.parse(login).id,
      };
      axios
        .post(`${URL}/organic/getOrderDetails`, id)
        .then((res) =>
          setTimeout(() => {
            this.setState({
              loading: false,
              details: res.data.details,
              username: res.data.details[0].username,
              state: res.data.details[0].state,
              district: res.data.details[0].district,
              pincode: res.data.details[0].pincode,
              mobilenumber: res.data.details[0].mobilenumber,
              address: res.data.details[0].address,
              landmark: res.data.details[0].landmark,
            });
          }, 4000)
        )
        .catch((err) => console.log(err));
    }
  }

  d() {
    var d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toDateString();
  }

  handleEdit = () => {
    this.setState({ edit: true });
  };

  handleUpdateUser = () => {
    if (this.state.mobilenumber.length !== 10) {
      alert("There must be 10 numbers entered in mobile number");
    } else if (!parseInt(this.state.mobilenumber.match(/^[0-9]+$/))) {
      alert("Numbers should only be entered in mobile number");
    } else if (!parseInt(this.state.pincode.match(/^[0-9]+$/))) {
      alert("Numbers should only be entered in pincode");
    } else if (this.state.pincode.length !== 6) {
      alert("There must be only 6 numbers entered in pincode");
    } else {
      this.setState({ loading: true });
      const login = localStorage.getItem("loggedin");
      const user_details = {
        username: this.state.username,
        state: this.state.state,
        district: this.state.district,
        pincode: this.state.pincode,
        mobilenumber: this.state.mobilenumber,
        address: this.state.address,
        landmark: this.state.landmark,
        id: JSON.parse(login).id,
      };
      axios
        .post(`${URL}/organic/login/updateuser`, user_details)
        .then((res) => {
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            alert(res.data);
            window.location.reload(false);
          }, 4000);
        })
        .catch((err) => console.log(err));
    }
  };

  handleOrderItem = (item, index) => {
    const value = localStorage.getItem("loggedin");
    const data1 = {
      order: this.state.data,
      delieverydate: this.d(),
      user_id: JSON.parse(value).id,
    };
    this.setState({ loading: true });
    axios
      .post(`${URL}/organic/order`, data1)
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false });
          alert(res.data);
          this.props.history.push("/account/orders");
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <AppBar />
        <br />
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper>
                  <div className='order_title_div'>
                    <Typography className='order_title'>
                      DELEIVERY ADDRESS
                    </Typography>
                    <hr />
                  </div>
                  {this.state.edit === false
                    ? this.state.details.map((item, index) => {
                        return (
                          <div key={index} style={{ margin: "1%" }}>
                            <Grid container>
                              <Grid item xs={6}>
                                <Typography>
                                  {item.username.toUpperCase()}
                                </Typography>
                                <Typography>{item.address}</Typography>
                                <Typography>{item.district}</Typography>
                                <Typography>
                                  {item.state} - {item.pincode}
                                </Typography>
                                <Typography>{item.mobilenumber} </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Button
                                  variant='contained'
                                  color='secondary'
                                  className='order_button'
                                  onClick={() => this.handleEdit()}>
                                  EDIT
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })
                    : this.state.details.map((item, index) => {
                        return (
                          <div style={{ margin: "1%" }} key={index}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.username}
                                  label='Username'
                                  onChange={(e) =>
                                    this.setState({ username: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.mobilenumber}
                                  label='Mobile Number'
                                  onChange={(e) =>
                                    this.setState({
                                      mobilenumber: e.target.value,
                                    })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.pincode}
                                  label='Pincode'
                                  onChange={(e) =>
                                    this.setState({ pincode: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.district}
                                  label='District'
                                  onChange={(e) =>
                                    this.setState({ district: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  multiline
                                  rows={4}
                                  value={this.state.address}
                                  label='Address'
                                  onChange={(e) =>
                                    this.setState({ address: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.state}
                                  label='State'
                                  onChange={(e) =>
                                    this.setState({ state: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  variant='outlined'
                                  value={this.state.landmark}
                                  label='Landmark'
                                  onChange={(e) =>
                                    this.setState({ landmark: e.target.value })
                                  }
                                />
                              </Grid>
                              <Grid item xs={6} md={3}>
                                <Button
                                  fullWidth
                                  variant='contained'
                                  color='secondary'
                                  onClick={() => this.handleUpdateUser()}>
                                  SAVE AND DELIEVER HERE
                                </Button>
                              </Grid>
                              <Grid item xs={6} md={3}>
                                <Button
                                  variant='outlined'
                                  color='primary'
                                  onClick={() =>
                                    this.setState({ edit: false })
                                  }>
                                  CANCEL
                                </Button>
                              </Grid>
                            </Grid>
                          </div>
                        );
                      })}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper square elevation={7}>
                  <div className='order_title_div'>
                    <Typography className='order_title'>
                      ORDER SUMMARY
                    </Typography>
                    <hr />
                  </div>
                  {this.state.data !== undefined ? (
                    this.state.data.map((item, index) => {
                      return (
                        <div key={index} style={{ margin: "1%" }}>
                          <Grid container>
                            <Grid item xs={12} md={3}>
                              <img
                                alt={item.name}
                                src={
                                  "data:image/*;base64," + item.image
                                }
                                className='order_image'
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <Typography>
                                {item.name.toUpperCase()}
                              </Typography>
                              <Typography>
                                Price per kg: ₹{item.price}
                              </Typography>
                              <Typography>
                                Quantity needed: {item.quantityneeded} kg
                              </Typography>
                              <Typography>
                                Net Price : ₹{item.totalprice}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography>
                                Expected Delievery: {this.d()}
                              </Typography>
                            </Grid>
                          </Grid>
                          <hr />
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <h1>Order an item in the given list</h1>
                    </div>
                  )}
                  <Grid item xs={12}>
                    <Button
                      variant='contained'
                      color='secondary'
                      className='order_button'
                      onClick={(e) => this.handleOrderItem(e)}>
                      O R D E R
                    </Button>
                    <br />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Order);
