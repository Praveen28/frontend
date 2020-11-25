import React from "react";

import AppBar from "../AppBar/AppBar";
import Description from "../Description/Description";
import VegetableContainer from "../VegetableConatiner/VegetablePage";

class MainContainer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppBar />
        <Description />
        <br/>
        <VegetableContainer />
      </React.Fragment>
    );
  }
}

export default MainContainer;
