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
import "./deleteVegetables.css";
import axios from "axios";

class DeleteVegetables extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    axios
      .get("/organic/deleteVegetable")
      .then((res) => this.setState({ data: res.data }))
      .catch((err) => console.log(err));
  }

  handleDelete = (e, item) => {
    if (window.confirm("Are you sure to delete")) {
      const value = { id: item._id };
      axios
        .post("/organic/deleteVegetable/delete", value)
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
            <Typography className="delete_title">ORGANIC FARMING</Typography>
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
                    <Typography>{item.vegetablename} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.vegetableprice} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.vegetablequantity} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.vegetabledescription} </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <img
                      alt={item.vegetablename}
                      src={"data:image/*;base64," + item.vegetableimage}
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

export default DeleteVegetables;
