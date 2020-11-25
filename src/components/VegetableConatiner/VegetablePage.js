import React from "react";
import {
  Paper,
  Typography,
  Button,
  Container,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import "./VegetablePage.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import URL from "../../config";

class VegetableContainer extends React.Component {
  state = {
    data: [],
    loading: false,
  };
  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${URL}/organic/getVegetables`)
      .then((res) =>
        setTimeout(() => {
          this.setState({ loading: false, data: res.data });
        }, 1000)
      )
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <React.Fragment>
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
            <Paper elevation={10}>
              <Toolbar>
                <Typography className='veg_title'>VEGETABLES</Typography>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => this.props.history.push("/allvegetables")}>
                  VIEW ALL
                </Button>
              </Toolbar>
              <hr />
              <div className='flex_veg'>
                {this.state.data.slice(0, 5).map((item, index) => {
                  return (
                    <div
                      key={index}
                      className='vegetable_paper'
                      onClick={() => this.props.history.push("/allvegetables")}>
                      <img
                        alt={item.vegetablename}
                        src={item.vegetableimage}
                        className='vegetable_image'
                      />
                      <br />
                      <br />
                      <Typography className='vegetable_name'>
                        {item.vegetablename.toUpperCase()}
                      </Typography>
                      <br />
                    </div>
                  );
                })}
              </div>
            </Paper>

            <br />
            <br />
            <br />
            <br />
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(VegetableContainer);
