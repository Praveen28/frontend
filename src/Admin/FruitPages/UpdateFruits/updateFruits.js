import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import URL from "../../config";

class Updatefruit extends React.Component {
  state = {
    updatefruit_fetch: [],
    edit: false,
    id: "",
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  };

  componentDidMount() {
    axios
      .get(`${URL}/organic/updatefruit`)
      .then((res) => this.setState({ updatefruit_fetch: res.data }))
      .catch((err) => console.log(err));
  }
  handleEdit = (e, item) => {
    this.setState({
      id: item._id,
      name: item.fruitname,
      price: item.fruitprice,
      quantity: item.fruitquantity,
      description: item.fruitdescription,
      image: item.fruitimage,
      edit: true,
    });
  };

  handleUpdate = () => {
    if (
      !this.state.name ||
      !this.state.price ||
      !this.state.quantity ||
      !this.state.description ||
      !this.state.image
    ) {
      alert("Fill in all the details..");
    } else if (
      this.state.name !==
      this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)
    ) {
      alert("1st letter of the fruit name should be in capital only.");
    } else {
      var formdata = new FormData();
      formdata.append("id", this.state.id);
      formdata.append("name", this.state.name);
      formdata.append("price", this.state.price);
      formdata.append("quantity", this.state.quantity);
      formdata.append("description", this.state.description);
      formdata.append("image", this.state.image);
      axios
        .post(`${URL}/organic/updatefruit/update`, formdata)
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
        <AppBar position='static' color='secondary'>
          <Toolbar>
            <Typography
              style={{
                textAlign: "center",
                letterSpacing: "0.2em",
                fontSize: "1.2rem",
                flexGrow: 1,
                color: "white",
              }}>
              ORGANIC FARMING
            </Typography>
            <Button variant='contained' color='secondary'>
              SIGN OUT
            </Button>
          </Toolbar>
        </AppBar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.NO</TableCell>
              <TableCell align='center'>NAME</TableCell>
              <TableCell align='center'>PRICE</TableCell>
              <TableCell align='center'>QUANTITY</TableCell>
              <TableCell align='center'>DESCRIPTION</TableCell>
              <TableCell align='center'>IMAGE</TableCell>
              <TableCell align='center'>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.edit === false ? (
              this.state.updatefruit_fetch.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>{index + 1} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.fruitname} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.fruitprice} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.fruitquantity} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.fruitdescription} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <img
                        alt={item.fruitname}
                        width='100'
                        height='50'
                        src={"data:image/*;base64," + item.fruitimage}
                      />
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        color='primary'
                        variant='contained'
                        value={item}
                        onClick={(e) => this.handleEdit(e, item)}>
                        EDIT
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell>
                  <Typography>1</Typography>
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.name}
                    label='Fruit name'
                    onChange={(e) =>
                      this.setState({ name: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.price}
                    label='Fruit price'
                    onChange={(e) =>
                      this.setState({ price: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.quantity}
                    label='Fruit quantity'
                    onChange={(e) =>
                      this.setState({ quantity: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.description}
                    label='Fruit description'
                    onChange={(e) =>
                      this.setState({
                        description: e.currentTarget.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <Button
                    variant='contained'
                    color='secondary'
                    value={this.state.id}
                    onClick={() => this.handleUpdate()}>
                    UPDATE
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Updatefruit;
