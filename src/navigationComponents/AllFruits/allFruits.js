import React from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import AppBar from "../../components/AppBar/AppBar";
import "./allFruits.css";
import URL from "../../config"

import axios from "axios";

class AllFruits extends React.Component {
  state = {
    data: [],
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${URL}/organic/getfruits`)
      .then((res) => {
        setTimeout(() => {
          this.setState({ loading: false, data: res.data });
        }, 3000);
      })
      .catch((err) => console.log(err));
  }

  handleItem = (e, item) => {
    var items = [];
    items.push(item);
    this.props.history.push(`/onefruit/${items[0]._id}`);
  };
  render() {
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
          <Container maxWidth='xl'>
            <Typography className='allfruits_title'>ALL FRUITS</Typography>
            <br />
            <Grid container spacing={3}>
              {this.state.data.map((item, index) => {
                return (
                  <Grid item md={3} xs={6} key={index}>
                    <Paper
                      elevation={15}
                      className='allfruits_paper'
                      onClick={(e) => this.handleItem(e, item)}>
                      <img
                        className='allfruits_image'
                        alt={item.fruitname}
                        src={"data:image/*;base64," + item.fruitimage}
                      />
                      <Typography className='allfruits_name'>
                        {item.fruitname.toUpperCase()}
                      </Typography>
                      <div style={{ marginLeft: "2%", marginRight: "2%" }}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              Price: ₹{item.fruitprice}/kg
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography style={{ textAlign: "right" }}>
                              Available: {item.fruitquantity}{" "}
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        )}
      </div>
    );
  }
}

export default AllFruits;
