import { useState } from "react";

import classes from "./OrderItem.module.css";
import Modal from "../UI/Modal";
import AddressDetails from "./AddressDetails";

const CartItem = (props) => {
  //   const price = `$${props.price.toFixed(2)}`;
  const [isAddress, setIsAddress] = useState(false);

  const addressHandler = () => {
    setIsAddress(true);
  };
  const closeHandler = () => {
    setIsAddress(false);
  };

  console.log("ARRAY = ", props.items);

  return (
    <ul>
      <div className={classes["address-orderid"]}>
        <h1 style={{ color: "#8a2b06" }}>ORDER ID - {props._id}</h1>
        <button
          className={classes.button}
          type="button"
          onClick={addressHandler}
        >
          Address
        </button>
      </div>
      {isAddress && (
        <Modal onClose={closeHandler}>
          <AddressDetails
            address={props.address.address}
            landmark={props.address.landmark}
            city={props.address.city}
            pincode={props.address.pincode}
          />
        </Modal>
      )}
      {props.items.map((food) => (
        <li key={food._id} className={classes["cart-item"]}>
          <div>
            <h1 style={{ textDecorationLine: "underline" }}>
              {food.item.restaurant}
            </h1>
            <h2>{food.item.title}</h2>
            <h3>{food.item.category}</h3>
            <div className={classes.summary}>
              <span className={classes.price}>₹ {food.item.price}</span>
              <span className={classes.amount}>x {food.quantity}</span>
            </div>
          </div>
          <div className={classes.actions}>
            <span>₹ {(food.item.price * food.quantity).toFixed(2)}</span>
            {/* <button onClick={props.onRemove}>−</button>
            <button onClick={props.onAdd}>+</button> */}
          </div>
        </li>
      ))}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹ {props.totalAmount.toFixed(2)}</span>
      </div>
    </ul>
  );
};

export default CartItem;
