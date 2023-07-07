import React from "react";

import classes from "./HeaderCartButton.module.css";

const HeaderIcon = (props) => {
  return (
    <div className={classes.button} onClick={props.onClick}>
      <span>{props.title}</span>
    </div>
  );
};

export default HeaderIcon;
