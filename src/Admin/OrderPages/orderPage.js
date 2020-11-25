import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";
import "./orderPage.css";
import axios from "axios";
import URL from "../../config";


class OrderPage extends React.Component {
  state = {
    orders: [],
    open: false,
    index: 0,
    id: "",
    list: [],
    available: false,
  };
  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (JSON.parse(login).status !== "1") {
      this.props.history.push("/login");
    } else {
      axios
        .get(`${URL}/organic/vieworder`)
        .then((res) => {
          this.setState({ orders: res.data });
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  d() {
    var d = new Date();
    d.setDate(d.getDate());
    return d.toDateString();
  }

  dd(e) {
    var date = new Date().getTime();
    var mydate = new Date(e).getTime();
    var result = "";
    if (date > mydate) {
      result = "greater";
    } else {
      result = "small";
    }
    return result;
  }

  updateDelievery = (e, id, u_id, index) => {
    const data1 = {
      index: index,
      id: id,
      user_id: u_id,
      date: this.d(),
    };
    axios
      .post(`${URL}/organic/vieworder/updateDelievery`, data1)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography
              style={{
                textAlign: "center",
                letterSpacing: "0.2em",
                fontSize: "1.2rem",
                flexGrow: 1,
                color: "white",
              }}>
              ORDERS
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                localStorage.clear();
                this.props.history.push("/");
              }}>
              signout
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.orders.map((item, index) => {
          return (
            <div key={index}>
              <Table>
                <TableHead>
                  <TableCell>
                    <b> S.No</b>
                  </TableCell>
                  <TableCell>
                    <b>Item</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity Needed</b>
                  </TableCell>
                  <TableCell>
                    <b>Total Price</b>
                  </TableCell>
                  <TableCell>
                    <b>Address</b>
                  </TableCell>
                  <TableCell>
                    <b>Mobile Number</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                </TableHead>
                {item.order.map((orders, i) => {
                  return (
                    <React.Fragment>
                      {this.dd(orders.delieverydate) === "small" ? (
                        <TableBody key={i}>
                          <TableCell>{index + 1} </TableCell>
                          <TableCell>{orders.name} </TableCell>
                          <TableCell>{orders.quantityneeded} </TableCell>
                          <TableCell>{orders.totalprice} </TableCell>
                          <TableCell>{item.address} </TableCell>
                          <TableCell>{item.mobile_number} </TableCell>
                          <TableCell>
                            <Button
                              variant='contained'
                              color='secondary'
                              onClick={(e) =>
                                this.updateDelievery(e, orders.id, item._id, i)
                              }>
                              Delivery Today
                            </Button>
                          </TableCell>
                        </TableBody>
                      ) : (
                        <div></div>
                      )}
                    </React.Fragment>
                  );
                })}
              </Table>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderPage;
