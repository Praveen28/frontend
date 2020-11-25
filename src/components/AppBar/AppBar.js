import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Grid,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Sidedrawer from "../SideDrawer/sideDrawer";
import {
  MenuTwoTone,
  ExitToApp,
  AccountCircle,
  ArrowDropDown,
  RedeemSharp,
} from "@material-ui/icons";
import Backdrop from "../BackDrop/backDrop";

import "./AppBar.css";

class Appbar extends React.Component {
  state = {
    drawerOpen: false,
    anchorEl: null,
    open: false,
    open1: false,
  };

  backdrop = () => {
    this.setState({
      drawerOpen: false,
    });
  };

  handleOpen = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  };

  openProducts = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
      open1: true,
    });
  };

  closeProducts = () => {
    this.setState({
      open1: false,
    });
  };

  CloseMenu = () => {
    this.setState({ anchorEl: null, open: false });
  };

  render() {
    let backdrop;
    if (this.state.drawerOpen) {
      backdrop = <Backdrop backdrop={this.backdrop} />;
    }
    var value = localStorage.getItem("loggedin");
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <AppBar position='static' className='appbar_style'>
          <Toolbar>
            <Typography
              className='appbar__title'
              onClick={() => this.props.history.push("/")}>
              ORGANIC FARMING
            </Typography>

            {/* {JSON.parse(value) !== null ? (
              <Typography></Typography>
            ) : (
              <Button
                className='appbar_buttons'
                onClick={() => this.props.history.push("/login")}>
                LOGIN
              </Button>
            )} */}
            <div>
              <MenuTwoTone
                className='hamburger_button'
                onClick={() => this.setState({ drawerOpen: true })}
              />
              <Sidedrawer show={this.state.drawerOpen} /> {backdrop}
            </div>
            <div className='appbar_list_buttons'>
              {JSON.parse(value) !== null ? (
                <Typography></Typography>
              ) : (
                <Button
                  className='appbar_buttons'
                  onClick={() => this.props.history.push("/login")}>
                  LOGIN
                </Button>
              )}
              <Button className='appbar_buttons' onClick={this.openProducts}>
                PRODUCTS <ArrowDropDown />
              </Button>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={this.state.open1}
                onClose={this.closeProducts}
                MenuListProps={{
                  style: {
                    width: "1000px",
                  },
                }}>
                <Grid container alignItems='center' justify='center'>
                  <Grid item xs={6}>
                    <MenuItem
                      onClick={() => {
                        this.props.history.push("/allvegetables");
                      }}>
                      <img
                        src='https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6'
                        alt='veg_images'
                        className='products_image'
                      />
                    </MenuItem>
                    <Typography className='products_title'>
                      VEGETABLES
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <MenuItem
                      onClick={() => {
                        this.props.history.push("/allfruits");
                      }}>
                      <img
                        src='https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4'
                        alt='veg_images'
                        className='products_image'
                      />
                    </MenuItem>
                    <Typography className='products_title'>FRUITS</Typography>
                  </Grid>
                </Grid>
              </Menu>
              <Button
                className='appbar_buttons'
                onClick={() => {
                  this.props.history.push("/account/cart");
                }}>
                CART
              </Button>

              {JSON.parse(value) !== null ? (
                <div>
                  <Button className='appbar_buttons' onClick={this.handleOpen}>
                    {JSON.parse(value).username} <ArrowDropDown />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    open={this.state.open}
                    onClose={this.CloseMenu}
                    MenuListProps={{
                      style: {
                        width: 200,
                      },
                    }}>
                    <MenuItem
                      onClick={() => {
                        this.props.history.push("/profile");
                      }}>
                      <ListItemIcon>
                        <AccountCircle style={{ color: "#0F8C05" }} />
                      </ListItemIcon>
                      <Typography>Profile</Typography>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      onClick={() => {
                        this.props.history.push("/account/orders");
                      }}>
                      <ListItemIcon>
                        <RedeemSharp style={{ color: "#0F8C05" }} />
                      </ListItemIcon>
                      <Typography>Orders</Typography>
                    </MenuItem>
                    <hr />
                    <MenuItem
                      onClick={() => {
                        localStorage.clear();
                        this.props.history.push("/");
                      }}>
                      <ListItemIcon>
                        <ExitToApp style={{ color: "red" }} />
                      </ListItemIcon>
                      <Typography>Logout</Typography>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Typography></Typography>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withRouter(Appbar);
