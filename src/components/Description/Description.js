import React from "react";
import { Typography } from "@material-ui/core";
import "./Description.css";

class Description extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="description_div">
          <img
            alt="description"
            className="description_image"
            src="https://i.pinimg.com/originals/95/87/eb/9587eb0dd8e58fdbaef46fce14e582ee.png"
          />
          <Typography className="description_title">
            DIRECTLY FROM FARMLAND TO HOUSELAND
          </Typography>
        </div>
      </React.Fragment>
    );
  }
}

export default Description;
