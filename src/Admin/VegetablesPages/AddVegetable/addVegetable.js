import React from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Grid,
  TextField,
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import "./addVegetable.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
import URL from "../../config";


class addVegetable extends React.Component {
  state = {
    loading: false,
    vegetable_name: "",
    vegetable_price: "",
    vegetable_quantity: "",
    vegetable_description: "",
    vegetable_image: "",
    vegetable_advantages: "",
    vegetable_status: "",
    result: [],
  };

  status = (e) => {
    this.setState({ vegetable_status: e.target.value });
  };

  addVegetable = () => {
    const add_veg = {
      veg_name: this.state.vegetable_name,
      veg_price: this.state.vegetable_price,
      veg_quantity: this.state.vegetable_quantity,
      veg_description: this.state.vegetable_description,
      veg_advantage: this.state.vegetable_advantages,
      veg_status: this.state.vegetable_status,
      veg_image: this.state.vegetable_image,
    };

    if (
      !add_veg.veg_name ||
      !add_veg.veg_price ||
      !add_veg.veg_quantity ||
      !add_veg.veg_description ||
      !add_veg.veg_status ||
      !add_veg.veg_image
    ) {
      alert("Please fill in all the details");
    } else if (
      add_veg.veg_name !==
      add_veg.veg_name.charAt(0).toUpperCase() + add_veg.veg_name.slice(1)
    ) {
      alert("Only the 1st letter of the name should be in capital.");
    } else {
      this.setState({ loading: true });
      axios
        .post(`${URL}/organic/addVegetable`, add_veg)
        .then((res) => {
          setTimeout(() => {
            this.setState({
              loading: false,
            });
            this.setState({ result: res.data });
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };
  render() {
    return (
      <React.Fragment>
        <AppBar position='static' color='secondary'>
          <Toolbar>
            <Typography className='add_title'>ORGANIC FARMING</Typography>
            <Button
              color='secondary'
              variant='contained'
              onClick={() => this.props.history.push("/")}>
              signout
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.loading === true ? (
          <h1>lod</h1>
        ) : (
          <Container>
            <div style={{ marginTop: "10%" }}></div>
            <Paper elevation={15}>
              <div style={{ backgroundColor: "#E11B5D" }}>
                <Typography className='add_title'>
                  ADD VEGETABLE SECTION
                </Typography>
                <hr />
              </div>
              <div style={{ margin: "1%" }}>
                <Grid container spacing={2}>
                  <Grid item md={3} xs={12}>
                    <TextField
                      label='Name of the vegetable'
                      fullWidth
                      value={this.state.vegetable_name}
                      variant='outlined'
                      onChange={(e) =>
                        this.setState({ vegetable_name: e.currentTarget.value })
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      label='Price per kg'
                      fullWidth
                      variant='outlined'
                      value={this.state.vegetable_price}
                      onChange={(e) =>
                        this.setState({
                          vegetable_price: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      label='Quantity in kg'
                      fullWidth
                      value={this.state.vegetable_quantity}
                      variant='outlined'
                      onChange={(e) =>
                        this.setState({
                          vegetable_quantity: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <FormControl fullWidth variant='outlined'>
                      <InputLabel>Status</InputLabel>
                      <Select onChange={this.status}>
                        <MenuItem value='Available'>Available</MenuItem>
                        <MenuItem value='Not-Available'>Not-Available</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Description of the vegetable'
                      multiline
                      value={this.state.vegetable_description}
                      rows={5}
                      fullWidth
                      variant='outlined'
                      onChange={(e) =>
                        this.setState({
                          vegetable_description: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Advantages of the vegetable'
                      multiline
                      value={this.state.vegetable_advantages}
                      rows={5}
                      fullWidth
                      variant='outlined'
                      onChange={(e) =>
                        this.setState({
                          vegetable_advantages: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label='Image Url'
                      fullWidth
                      variant='outlined'
                      value={this.state.vegetable_image}
                      onChange={(e) =>
                        this.setState({
                          vegetable_image: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={12}>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => this.addVegetable()}>
                      ADD VEGETABLE
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Paper>
            <br />
            <br />
            {this.state.result !== undefined ? (
              this.state.result.map((item, index) => (
                <Paper key={index}>
                  <Typography
                    style={{
                      backgroundColor: "#30AC04",
                      color: "white",
                      textAlign: "center",
                      letterSpacing: "0.2em",
                    }}>
                    RESULT:
                  </Typography>
                  <Typography
                    style={
                      item.status === 1
                        ? {
                            color: "red",
                            textAlign: "center",
                            fontSize: "1.3rem",
                          }
                        : {
                            color: "green",
                            textAlign: "center",
                            fontSize: "1.3rem",
                          }
                    }>
                    {item.message}
                  </Typography>
                  <br />
                  <Button
                    fullWidth
                    color='secondary'
                    variant='contained'
                    onClick={() => window.location.reload(false)}>
                    ENTER A NEW ITEM..CLICK HERE
                  </Button>
                </Paper>
              ))
            ) : (
              <h4> </h4>
            )}
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(addVegetable);
