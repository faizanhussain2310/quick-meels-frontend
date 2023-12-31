import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart();
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {/* <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      /> */}
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
