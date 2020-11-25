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
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import axios from "axios";
import URL from "../../config";


class addFruits extends React.Component {
  state = {
    loading: false,
    fruits_name: "",
    fruits_price: "",
    fruits_quantity: "",
    fruits_description: "",
    fruits_image: "",
    result: [],
  };

  addFruit = () => {
    const add_fruits = {
      fruit_name: this.state.fruits_name,
      fruit_price: this.state.fruits_price,
      fruit_quantity: this.state.fruits_quantity,
      fruit_description: this.state.fruits_description,
      fruit_image: this.state.fruits_image,
    };

    if (
      !add_fruits.fruit_name ||
      !add_fruits.fruit_price ||
      !add_fruits.fruit_quantity ||
      !add_fruits.fruit_description ||
      !add_fruits.fruit_image
    ) {
      alert("Please fill in all the details");
    } else if (
      add_fruits.fruit_name !==
      add_fruits.fruit_name.charAt(0).toUpperCase() +
        add_fruits.fruit_name.slice(1)
    ) {
      alert("Only the 1st letter of the name should be in capital.");
    } else {
      const formdata = new FormData();
      formdata.append("name", add_fruits.fruit_name);
      formdata.append("price", add_fruits.fruit_price);
      formdata.append("quantity", add_fruits.fruit_quantity);
      formdata.append("description", add_fruits.fruit_description);
      formdata.append("image", add_fruits.fruit_image);
      this.setState({ loading: true });
      axios
        .post(`${URL}/organic/addfruit`, formdata)
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
        <AppBar position="static" color="secondary">
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
            <Button
              color="secondary"
              variant="contained"
              onClick={() => this.props.history.push("/")}
            >
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
                <Typography
                  style={{
                    textAlign: "center",
                    letterSpacing: "0.2em",
                    fontSize: "1.2rem",
                    color: "white",
                  }}
                >
                  ADD FRUITS SECTION
                </Typography>
                <hr />
              </div>
              <div style={{ margin: "1%" }}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <TextField
                      label="Name of the fruit"
                      fullWidth
                      value={this.state.fruits_name}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({ fruits_name: e.currentTarget.value })
                      }
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                      label="Price per kg"
                      fullWidth
                      variant="outlined"
                      value={this.state.fruits_price}
                      onChange={(e) =>
                        this.setState({
                          fruits_price: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                      label="Quantity in kg"
                      fullWidth
                      value={this.state.fruits_quantity}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({
                          fruits_quantity: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Description of the vegetable"
                      multiline
                      value={this.state.fruits_description}
                      rows={5}
                      fullWidth
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({
                          fruits_description: e.currentTarget.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Paper style={{ height: "100%" }}>
                      <Typography
                        style={{
                          backgroundColor: "#E11B5D",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Select the image of the vegetable
                      </Typography>
                      <br />
                      <input
                        style={{ width: "100%" }}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          this.setState({ fruits_image: e.target.files[0] })
                        }
                      />
                      <br />
                      <br />
                      <Typography>
                        D I S C L A I M E R:
                        <br />
                        Please note that the image size should not be more than
                        1mb.
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={10}></Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => this.addFruit()}
                    >
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
                    }}
                  >
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
                    }
                  >
                    {item.message}
                  </Typography>
                  <br />
                  <Button
                    color="secondary"
                    variant="contained"
                    style={{ marginLeft: "10%" }}
                    onClick={() => window.location.reload(false)}
                  >
                    ENTER A NEW ITEM..CLICK HERE
                  </Button>
                  <br />
                  <br />
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

export default withRouter(addFruits);
