import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import {
  Typography,
  Container,
  Paper,
  Grid,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import "./cart.css";
import URL from "../../config"

class Cart extends React.Component {
  state = {
    cart: [],
    loading: false,
  };
  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (JSON.parse(login) === null) {
      alert("Login in order to view the carts");
      this.props.history.push("/login");
    } else {
      this.setState({ loading: true });
      const id = {
        id: JSON.parse(login).id,
      };
      axios
        .post(`${URL}/organic/cart/getCart`, id)
        .then((res) => {
          setTimeout(() => {
            this.setState({ cart: res.data, loading: false });
          }, 2000);
        })
        .catch((err) => console.log(err));
    }
  }

  delieveryDate() {
    var date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toDateString();
  }

  totalprice = (price) => {
    this.setState({
      totalprice: parseInt(price) + this.state.totalprice,
    });
  };

  removeItem = (e, index) => {
    this.setState({ loading: true });
    const login = localStorage.getItem("loggedin");
    axios
      .post(`${URL}/organic/cart/removeItem`, {
        id: index,
        userid: JSON.parse(login).id,
      })
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false });
          alert(res.data);
          window.location.reload(false);
        });
      })
      .catch((err) => console.log(err));
  };
  render() {
    var price = 0;
    if (this.state.cart.length > 0) {
      price = this.state.cart.reduce(
        (totalPrice, onePrice) => totalPrice + onePrice.totalprice,
        0
      );
    }

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
            {this.state.cart.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                }}>
                <h4>Add items to cart in order to view.</h4>
              </div>
            ) : (
              <Container>
                <br />
                <Grid container spacing={2}>
                  <Grid item md={8}>
                    <Paper square={true}>
                      <div className='cart_items'>
                        <b style={{ padding: "3%" }}>
                          My Cart ({this.state.cart.length})
                        </b>
                        <hr />
                        {this.state.cart.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <div style={{ padding: "1%" }}>
                                <Grid container>
                                  <Grid item md={3}>
                                    <img
                                      alt={item.name}
                                      className='cart_images'
                                      src={"data:image/*;base64," + item.image}
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <Typography style={{ fontWeight: "bold" }}>
                                      {item.name}
                                    </Typography>
                                    <Typography>
                                      Price : ₹{item.price} /kg
                                    </Typography>
                                    <Typography>
                                      Needed : {item.quantityneeded} kg
                                    </Typography>
                                    <br />
                                    <br />
                                    <Typography style={{ fontWeight: "bold" }}>
                                      ₹{item.totalprice}
                                    </Typography>
                                    <br />
                                    <br />
                                    <Button
                                      variant='outlined'
                                      color='secondary'
                                      onClick={(e) =>
                                        this.removeItem(e, item._id)
                                      }>
                                      REMOVE
                                    </Button>
                                  </Grid>
                                  <Grid item md={5}>
                                    <Typography>
                                      Delievery by {this.delieveryDate()}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </div>
                              {index !== this.state.cart.length - 1 ? (
                                <hr />
                              ) : (
                                <div></div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <Paper className='cartorder_button' elevation={24}>
                        <Button
                          variant='contained'
                          color='primary'
                          style={{ marginRight: "2%" }}
                          onClick={() =>
                            this.props.history.push("/order", this.state.cart)
                          }>
                          PLACE ORDER
                        </Button>
                      </Paper>
                    </Paper>
                  </Grid>
                  <Grid item md={4}>
                    <Paper style={{ padding: "2%" }} elevation={5}>
                      <Typography>PRICE DETAILS</Typography>
                      <hr />
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Typography>
                            Price ({this.state.cart.length} items)
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{ float: "right" }}>
                            ₹{price}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography>Delievery Fee</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography style={{ float: "right" }}>₹0</Typography>
                        </Grid>
                      </Grid>
                      <br />
                      <Divider style={{ borderStyle: "none none dotted" }} />
                      <br />
                      <div style={{ display: "flex", width: "100%" }}>
                        <Typography style={{ flexGrow: 1 }}>
                          TOTAL AMOUNT
                        </Typography>
                        <Typography>₹{price}</Typography>
                      </div>
                      <br />
                      <Divider style={{ borderStyle: "none none dotted" }} />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Cart;
