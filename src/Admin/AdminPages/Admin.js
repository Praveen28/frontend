import React, { Component } from "react";
import { Container, Paper, Grid, Typography, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import "./Admin.css";

import AppBar from "../../components/AppBar/AppBar";

class Admin extends Component {
  componentDidMount() {
    const login = localStorage.getItem("loggedin");
    if (JSON.parse(login).status !== "1") {
      alert("Address is not valid.");
    }
  }
  render() {
    return (
      <React.Fragment>
        <AppBar />
        <div style={{ marginTop: "1%" }}></div>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper elevation={10}>
                <Typography className='admin_section'>
                  VEGETABLE SECTION
                </Typography>
                <hr />
                <img
                  alt='vegetable'
                  src='https://www.pngkey.com/png/detail/67-673902_vegetable-png-picture-vegetables-name.png'
                  className='admin_vegetables'
                />
                <br />
                <Grid
                  container
                  style={{ padding: "1%" }}
                  alignItems='center'
                  justify='center'>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      style={{ width: "90%" }}
                      variant='contained'
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/addveg")
                      }>
                      ADD
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{ width: "90%" }}
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/updateveg")
                      }>
                      UPDATE
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{ width: "90%", alignItems: "center" }}
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/deleteveg")
                      }>
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={10}>
                <Typography className='admin_section'>
                  FRUITS SECTION
                </Typography>
                <hr />
                <img
                  alt='vegetable'
                  src='https://freepngimg.com/thumb/fruit/4-2-fruit-png-image.png'
                  className='admin_vegetables'
                />
                <br />
                <Grid
                  container
                  style={{ padding: "1%" }}
                  alignItems='center'
                  justify='center'>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      style={{ width: "90%" }}
                      variant='contained'
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/addfruit")
                      }>
                      ADD
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{ width: "90%" }}
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/updatefruit")
                      }>
                      UPDATE
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant='contained'
                      style={{ width: "90%", alignItems: "center" }}
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/deletefruit")
                      }>
                      DELETE
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={10}>
                <Typography className='admin_section'>
                  ORDERS SECTION
                </Typography>
                <hr />
                <img
                  alt='vegetable'
                  src='https://blog.procurify.com/app/uploads/2018/03/ordermanagement.png'
                  className='admin_vegetables'
                />
                <br />
                <Grid
                  container
                  style={{ padding: "1%" }}
                  alignItems='center'
                  justify='center'>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      style={{ width: "90%" }}
                      variant='contained'
                      color='secondary'
                      onClick={() =>
                        this.props.history.push("/login/admin/viewOrder")
                      }>
                      VIEW ORDERS
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Admin);
