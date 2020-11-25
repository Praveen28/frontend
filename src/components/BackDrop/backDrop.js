import React from "react";
import "./backDrop.css";

class Backdrop extends React.Component{
    render(){
        return (
            <div className="backdrop" onClick={this.props.backdrop}></div>
        )
    }
}

export default Backdrop;