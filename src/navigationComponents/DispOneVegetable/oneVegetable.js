import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import "./oneVegetable.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import URL from "../../config";


class OneVegetable extends React.Component {
  state = {
    data: [],
    vegetables: [],
    quantityavailable: "",
    quantityneeded: "",
    price: "",
    cart: false,
    visible: false,
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${URL}/organic/getVegetables/onevegetable/${this.props.match.params.id}`)
      .then((res) => {
        setTimeout(() => {
          if (res.data === "error") {
            alert("Invalid vegetable id...");
            this.props.history.push("/allvegetables");
          } else {
            this.setState({
              data: res.data,
              loading: false,
              quantityavailable: res.data[0].vegetablequantity,
            });
          }
        }, 1000);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${URL}/organic/getVegetables`)
      .then((res) => this.setState({ vegetables: res.data }))
      .catch((err) => console.log(err));
  }

  handleQuantity = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };

  handleCart = () => {
    if (!this.state.quantityneeded) {
      alert("Please select the quantity.");
    } else {
      this.setState({ loading: true });
      const value = localStorage.getItem("loggedin");
      const data1 = {
        name: this.state.data[0].vegetablename,
        price: this.state.data[0].vegetableprice,
        quantityneeded: this.state.quantityneeded,
        totalprice: this.state.price,
        image: this.state.data[0].vegetableimage,
        user_id: JSON.parse(value).id,
      };
      axios
        .post(`${URL}/organic/cart/addCart`, data1)
        .then((res) => {
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
            alert(res.data);
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  handleBuy = () => {
    this.setState({
      visible: true,
    });
  };

  handleClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleQuantity = (e) => {
    if (e.target.value === "500") {
      this.setState({
        quantityneeded: e.target.value,
        price: (
          parseInt(e.target.value) / parseInt(this.state.data[0].vegetableprice)
        ).toFixed(2),
      });
    } else if (e.target.value === "1") {
      this.setState({
        quantityneeded: e.target.value,
        price:
          parseInt(e.target.value) *
          parseInt(this.state.data[0].vegetableprice),
      });
    } else if (e.target.value === "2") {
      this.setState({
        quantityneeded: e.target.value,
        price:
          parseInt(e.target.value) *
          parseInt(this.state.data[0].vegetableprice),
      });
    } else {
      this.setState({
        quantityneeded: e.target.value,
        price:
          parseInt(e.target.value) *
          parseInt(this.state.data[0].vegetableprice),
      });
    }
  };

  handleOrder = () => {
    if (!this.state.quantityneeded) {
      alert("Please select the quantity.");
    } else {
      const value = localStorage.getItem("loggedin");
      const data1 = {
        name: this.state.data[0].vegetablename,
        price: this.state.data[0].vegetableprice,
        quantityneeded: this.state.quantityneeded,
        totalprice: this.state.price,
        image: this.state.data[0].vegetableimage,
        user_id: JSON.parse(value).id,
      };
      var items = [];
      items.push(data1);
      this.props.history.push(`/order`, items);
    }
  };

  render() {
    const value = localStorage.getItem("loggedin");
    return (
      <div>
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
          <div>
            <Container maxWidth='lg'>
              <br />
              <Grid container>
                {this.state.data.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item md={5} xs={12}>
                        <Paper className='one_paper' elevation={5}>
                          <img
                            alt={item.vegetablename}
                            src={"data:image/*;base64," + item.vegetableimage}
                            className='onevegetable_image'
                          />
                        </Paper>
                        <br />
                        <Grid container>
                          {item.vegetablestatus === "Available" ? (
                            <React.Fragment>
                              <Grid item xs={6}>
                                <Button
                                  style={{ width: "70%" }}
                                  variant='contained'
                                  color='secondary'
                                  onClick={() =>
                                    this.setState({
                                      visible: true,
                                      cart: true,
                                    })
                                  }>
                                  ADD TO CART
                                </Button>
                              </Grid>
                              <Grid item xs={6}>
                                <div>
                                  <Button
                                    style={{ float: "right", width: "70%" }}
                                    variant='contained'
                                    color='secondary'
                                    onClick={() => this.handleBuy()}>
                                    BUY NOW
                                  </Button>
                                  <Modal
                                    open={this.state.visible}
                                    onClose={() => this.handleClose()}>
                                    <Paper className='onevegetable_modal_paper'>
                                      {JSON.parse(value) === null ? (
                                        <div
                                          style={{
                                            margin: "2%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                          }}>
                                          <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() =>
                                              this.props.history.push("/login")
                                            }>
                                            Please Login
                                          </Button>
                                        </div>
                                      ) : this.state.cart === false ? (
                                        <div>
                                          <div style={{ margin: "2%" }}>
                                            <Typography>
                                              Select the quantity you needed
                                            </Typography>
                                            <br />
                                            <FormControl
                                              variant='outlined'
                                              style={{ width: "100%" }}>
                                              <InputLabel>Quantity</InputLabel>
                                              <Select
                                                label='Quantity'
                                                value={
                                                  this.state.quantityneeded
                                                }
                                                onChange={this.handleQuantity}>
                                                <MenuItem value=''>
                                                  None
                                                </MenuItem>
                                                <MenuItem value='500'>
                                                  500grams
                                                </MenuItem>
                                                <MenuItem value='1'>
                                                  1kg
                                                </MenuItem>
                                                <MenuItem value='2'>
                                                  2kg
                                                </MenuItem>
                                                <MenuItem value='3'>
                                                  3kg
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                            <br />
                                            <br />
                                            <Button
                                              variant='contained'
                                              color='secondary'
                                              onClick={() =>
                                                this.handleOrder()
                                              }>
                                              ORDER
                                            </Button>
                                            <br />
                                          </div>
                                        </div>
                                      ) : (
                                        <div>
                                          <div style={{ margin: "2%" }}>
                                            <Typography>
                                              Select the quantity you needed
                                            </Typography>
                                            <br />
                                            <FormControl
                                              variant='outlined'
                                              style={{ width: "100%" }}>
                                              <InputLabel>Quantity</InputLabel>
                                              <Select
                                                label='Quantity'
                                                value={
                                                  this.state.quantityneeded
                                                }
                                                onChange={this.handleQuantity}>
                                                <MenuItem value=''>
                                                  None
                                                </MenuItem>
                                                <MenuItem value='500'>
                                                  500grams
                                                </MenuItem>
                                                <MenuItem value='1'>
                                                  1kg
                                                </MenuItem>
                                                <MenuItem value='2'>
                                                  2kg
                                                </MenuItem>
                                                <MenuItem value='3'>
                                                  3kg
                                                </MenuItem>
                                              </Select>
                                            </FormControl>
                                            <br />
                                            <br />
                                            <Button
                                              variant='contained'
                                              color='secondary'
                                              onClick={() => this.handleCart()}>
                                              ADD TO CART
                                            </Button>
                                            <br />
                                          </div>
                                        </div>
                                      )}
                                    </Paper>
                                  </Modal>
                                </div>
                              </Grid>
                            </React.Fragment>
                          ) : (
                            <div>
                              <h3 style={{ textAlign: "center" }}>
                                This item is currently not available
                              </h3>{" "}
                            </div>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item md={7} xs={12}>
                        <Grid container style={{ marginLeft: "2%" }}>
                          <Grid item xs={5}>
                            <Typography>Name of the vegetable</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{item.vegetablename}</Typography>
                          </Grid>
                          <br />
                          <br />
                          <Grid item xs={5}>
                            <Typography>Price of the vegetable</Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>₹{item.vegetableprice}/ kg</Typography>
                          </Grid>
                          <br />
                          <br />
                          <Grid item xs={5}>
                            <Typography>Quantity available </Typography>
                          </Grid>
                          <Grid item xs={1}>
                            <Typography>:</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography>{item.vegetablequantity} kg</Typography>
                          </Grid>
                          <br />
                          <br />
                          <Grid item xs={12}>
                            <Paper>
                              <br />
                              <Typography className='onevegtable_title'>
                                DESCRIPTION
                              </Typography>
                              <hr />
                              <Typography className='onevegetable_about'>
                                {item.vegetabledescription}
                              </Typography>
                            </Paper>
                          </Grid>
                          <br />
                          <br />
                          <Grid item xs={12}>
                            <Paper>
                              <br />
                              <Typography className='onevegtable_title'>
                                ADVANTAGES
                              </Typography>
                              <hr />
                              <Typography className='onevegetable_about'>
                                {item.vegetableadvantage}
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Container>
            <br />
            <Container maxWidth='xl'>
              <Paper style={{ cursor: "pointer" }} elevation={10}>
                <br />
                <Typography className='onevegtable_title'>
                  MORE VEGETABLES FOR YOU
                </Typography>
                <hr />
                <div style={{ margin: "1%" }}>
                  <Grid
                    container
                    spacing={5}
                    alignItems='center'
                    justify='center'>
                    {this.state.vegetables.slice(0, 4).map((item, index) => {
                      return (
                        <Grid item md={3} xs={6} key={index}>
                          <div
                            className='one_sub_vegetable_paper'
                            onClick={() => {
                              this.props.history.push(
                                `/onevegetable/${item._id}`
                              );
                              window.location.reload(false);
                            }}>
                            <img
                              alt={item.vegetablename}
                              src={"data:image/*;base64," + item.vegetableimage}
                              className='one_sub_vegetable_image'
                            />
                            <br />
                            <br />
                            <Typography className='vegetable_name'>
                              {item.vegetablename.toUpperCase()}
                            </Typography>
                            <br />
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              </Paper>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(OneVegetable);
