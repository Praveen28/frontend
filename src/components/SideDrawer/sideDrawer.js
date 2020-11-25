import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router-dom";
import "./sideDrawer.css";

class SideDrawer extends React.Component {
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }

    const login = localStorage.getItem("loggedin");

    return (
      <div className={drawerClasses}>
        <div className='sidedrawer_class'>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography
                style={{
                  flex: 1,
                }}>
                PRODUCTS
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                style={{ width: "100%", backgroundColor: "#DFDFDF" }}
                onClick={() => this.props.history.push("/allvegetables")}>
                Vegetables
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography
                style={{ width: "100%", backgroundColor: "#DFDFDF" }}
                onClick={() => this.props.history.push("/allfruits")}>
                Fruits
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion onClick={() => this.props.history.push("/account/cart")}>
            <AccordionDetails>
              <Typography
                style={{
                  flex: 1,
                }}>
                CART
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* <Button
            style={{ margin: "2%" }}
            fullWidth
            onClick={() => this.props.history.push("/account/cart")}>
            CART
          </Button> */}
          {JSON.parse(login) !== null ? (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                  style={{
                    flex: 1,
                  }}>
                  {JSON.parse(login).username.toUpperCase()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  style={{ width: "100%", backgroundColor: "#DFDFDF" }}
                  onClick={() => this.props.history.push("/profile")}>
                  Profile
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography
                  style={{ width: "100%", backgroundColor: "#DFDFDF" }}
                  onClick={() => this.props.history.push("/account/orders")}>
                  Orders
                </Typography>
              </AccordionDetails>
              <AccordionDetails>
                <Typography
                  style={{ width: "100%", backgroundColor: "#DFDFDF" }}
                  onClick={() => {
                    localStorage.clear();
                    this.props.history.push("/");
                  }}>
                  Logout
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Accordion>
              <AccordionDetails>
                <Typography
                  style={{ width: "100%", color: "black" }}
                  onClick={() => this.props.history.push("/login")}>
                  LOGIN
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SideDrawer);
