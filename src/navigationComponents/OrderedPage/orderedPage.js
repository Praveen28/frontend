import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@material-ui/core";
import axios from "axios";
import AppBar from "../../components/AppBar/AppBar";
import "./orderedPage.css";
import URL from "../../config";

class OrderedPage extends React.Component {
  state = {
    order: [],
    loading: false,
  };

  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (JSON.parse(login) === null) {
      alert("Login in order to view your orders");
      this.props.history.push("/login");
    } else {
      this.setState({ loading: true });
      const id = {
        id: JSON.parse(login).id,
      };
      axios
        .post(`${URL}/organic/getOrderDetails/get-order`, id)
        .then((res) => {
          setTimeout(() => {
            this.setState({
              order: res.data.details.sort((a, b) => a - b).reverse(),
              loading: false,
            });
          }, 3000);
        })
        .catch((err) => console.log(err));
    }
  }
  date(ddate) {
    var date = new Date().getTime();
    var mydate = new Date(ddate).getTime();
    var fun = "";
    if (date > mydate) {
      fun = "greater";
    } else {
      fun = "smal";
    }
    return fun;
  }

  cancelOrder = (e, index) => {
    const login = localStorage.getItem("loggedin");
    if (window.confirm("Delete the order")) {
      axios
        .post(`${URL}/organic/cancelOrder`, {
          id: JSON.parse(login).id,
          item_id: index,
        })
        .then((res) => {
          console.log(res.data);
          window.location.reload(false);
        });
    }
  };
  render() {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#EEF1EC" }}>
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
          <Container>
            {this.state.order !== undefined ? (
              this.state.order.map((item, index) => {
                return (
                  <div key={index}>
                    <Paper className='ordered_paper'>
                      <Grid container spacing={2}>
                        <Grid item md={2}>
                          <img
                            alt={item.name}
                            src={"data:image/*;base64," + item.image}
                            className='ordered_image'
                          />
                        </Grid>
                        <Grid item md={4}>
                          <b> {item.name} </b> <br />
                          <br />
                          <Typography>
                            Price: ₹{item.price}
                            /kg
                          </Typography>
                        </Grid>
                        <Grid item md={3}>
                          <Typography>
                            Total Price: ₹{item.totalprice}{" "}
                          </Typography>
                        </Grid>
                        <Grid item md={3}>
                          {this.date(item.delieverydate) === "greater" ? (
                            <Typography>
                              Delievered on <b> {item.delieverydate} </b>
                            </Typography>
                          ) : (
                            <div>
                              <Typography>
                                Will be delievered on
                                <b> {item.delieverydate} </b>
                              </Typography>
                              <br />
                              <br />
                              <Button
                                variant='contained'
                                color='secondary'
                                onClick={(e) => this.cancelOrder(e, item.id)}>
                                Cancel
                              </Button>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Paper>
                    <br />
                    <br />
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
            <Paper
              style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%)",
                padding: "1%",
                color: "blue",
              }}>
              <Typography> NO MORE RESULTS </Typography>
            </Paper>
          </Container>
        )}
      </div>
    );
  }
}

export default OrderedPage;
