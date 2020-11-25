import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import axios from "axios";

class Deletefruits extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
      .get("/organic/deletefruit")
      .then((res) => this.setState({ data: res.data }))
      .catch((err) => console.log(err));
  }

  handleDelete = (e, item) => {
    if (window.confirm("Are you sure to delete")) {
      const value = { id: item._id };
      axios
        .post("/organic/deletefruit/delete", value)
        .then((res) => {
          alert(res.data);
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography
              style={{
                textAlign: "center",
                letterSpacing: "0.2em",
                fontSize: "1.2rem",
                flexGrow: 1,
                color: "white",
              }}
            >
              ORGANIC FARMING
            </Typography>
            <Button color="secondary" variant="contained">
              SIGN OUT
            </Button>
          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>S.No</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Name</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Price</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Quantity</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Description</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Image</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>Delete</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{index + 1} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.fruitname} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.fruitprice} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.fruitquantity} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.fruitdescription} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      alt={item.fruitname}
                      src={"data:image/*;base64," + item.fruitimage}
                      width="100"
                      height="50"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Delete
                      value={item._id}
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={(e) => this.handleDelete(e, item)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Deletefruits;
