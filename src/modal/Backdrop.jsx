import React from "react";
import "./backdrop.css";

const Backdrop = props => {
  return props.show ? <div className="Backdrop" onClick={props.close} /> : null;
};

export default Backdrop;
