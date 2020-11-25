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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./updateVegetable.css";
import axios from "axios";

class UpdateVegetable extends React.Component {
  state = {
    updateVegetable_fetch: [],
    edit: false,
    id: "",
    name: "",
    price: "",
    quantity: "",
    description: "",
    advantage: "",
    status: "",
    image: "",
  };

  componentDidMount() {
    axios
      .get("/organic/updateVegetable")
      .then((res) => this.setState({ updateVegetable_fetch: res.data }))
      .catch((err) => console.log(err));
  }
  handleEdit = (e, item) => {
    this.setState({
      id: item._id,
      name: item.vegetablename,
      price: item.vegetableprice,
      quantity: item.vegetablequantity,
      description: item.vegetabledescription,
      advantage: item.vegetableadvantage,
      status: item.vegetablestatus,
      image: item.vegetableimage,
      edit: true,
    });
  };

  status = (e) => {
    this.setState({ status: e.target.value });
  };

  handleUpdate = () => {
    if (
      !this.state.name ||
      !this.state.price ||
      !this.state.quantity ||
      !this.state.description ||
      !this.state.advantage ||
      !this.state.status ||
      !this.state.image
    ) {
      alert("Fill in all the details..");
    } else if (
      this.state.name !==
      this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)
    ) {
      alert("1st letter of the vegetable name should be in capital only.");
    } else {
      const update_veg = {
        id: this.state.id,
        veg_name: this.state.name,
        veg_price: this.state.price,
        veg_quantity: this.state.quantity,
        veg_description: this.state.description,
        veg_advantage: this.state.advantage,
        veg_status: this.state.status,
        veg_image: this.state.image,
      };
      axios
        .post("/organic/updateVegetable/update", update_veg)
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
            <Typography className='updateveg_title'>ORGANIC FARMING</Typography>
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
              <TableCell align='center'>ADVANTAGES</TableCell>
              <TableCell align='center'>STATUS</TableCell>
              <TableCell align='center'>IMAGE</TableCell>
              <TableCell align='center'>EDIT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.edit === false ? (
              this.state.updateVegetable_fetch.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>{index + 1} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetablename} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetableprice} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetablequantity} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetabledescription} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetableadvantage} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{item.vegetablestatus} </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <img
                        alt={item.vegetablename}
                        width='100'
                        height='50'
                        src={item.vegetableimage}
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
                    label='Vegetable name'
                    onChange={(e) =>
                      this.setState({ name: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.price}
                    label='Vegetable price'
                    onChange={(e) =>
                      this.setState({ price: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.quantity}
                    label='Vegetable quantity'
                    onChange={(e) =>
                      this.setState({ quantity: e.currentTarget.value })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.description}
                    label='Vegetable description'
                    onChange={(e) =>
                      this.setState({
                        description: e.currentTarget.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    variant='outlined'
                    value={this.state.advantage}
                    label='Vegetable advantage'
                    onChange={(e) =>
                      this.setState({
                        advantage: e.currentTarget.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell align='center'>
                  <FormControl fullWidth variant='outlined'>
                    <InputLabel>Status</InputLabel>
                    <Select onChange={this.status} value={this.state.status}>
                      <MenuItem value='Available'>Available</MenuItem>
                      <MenuItem value='Not-Available'>Not-Available</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align='center'>
                  <TextField
                    value={this.state.image}
                    variant='outlined'
                    fullWidth
                    onChange={(e) =>
                      this.setState({
                        image: e.currentTarget.value,
                      })
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

export default UpdateVegetable;
