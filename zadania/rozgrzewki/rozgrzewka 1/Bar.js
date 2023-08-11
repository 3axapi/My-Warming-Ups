import React from "react";
import "./Bar.css";

function Bar (props) {
    if (!props.dinamic) return <div className="divk" style={{width: props.width, backgroundImage: props.color}}/>
    
    else return <div className="divk dinamic"/>
}

export default Bar;