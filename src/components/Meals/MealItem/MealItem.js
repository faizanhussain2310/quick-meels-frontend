import React, { useContext } from "react";

import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemFrom";
import CartContext from "../../../store/cart-context";

const MealItem = (props) => {
  const token = localStorage.getItem("token");
  const cartCtx = useContext(CartContext);

  const price = `₹ ${props.price.toFixed(2)}`;

  const addToCartHandler = async () => {
    cartCtx.addItem({
      id: props.id,
      amount: 1,
      name: props.name,
      price: props.price,
      category: props.category,
      restaurant: props.restaurant,
    });
    // console.log("RES = ", props.restaurant);
    const cartDetails = {
      id: props.id,
    };
    const response = await fetch("https://quick-meels-backend.onrender.com/feed/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(cartDetails),
    });
  };

  return (
    <li key={props.id} className={classes.meal}>
      <div>
        <h2>{props.restaurant}</h2>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.category}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div className={classes.meelsbtn}>
        {token && <MealItemForm id={props.id} onAddToCart={addToCartHandler} />}
      </div>
    </li>
  );
};

export default MealItem;
