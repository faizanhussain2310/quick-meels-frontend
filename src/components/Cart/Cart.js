import React, { useContext, useState } from "react";
import { redirect, json, useLoaderData } from "react-router-dom";

import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import Card from "../UI/Card";

const Cart = (props) => {
  const [orderIsShown, setOrderIsShown] = useState(false);

  const [isCart, setIsCart] = useState("NULL");

  const showOrderHandler = () => {
    setOrderIsShown(true);
  };

  const hideOrderHandler = () => {
    setOrderIsShown(false);
  };

  const { items, totalAmount } = useLoaderData();
  console.log("LOADER DATA = ", items, totalAmount);

  const cartCtx = useContext(CartContext);
  const token = localStorage.getItem("token");

  if (token && isCart === "NULL") {
    cartCtx.replaceCart(items, totalAmount);
    setIsCart("NOT_NULL");
  }

  console.log("CART_ITEM === ", cartCtx.items);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [isCheckout, setIsCheckout] = useState(false);

  const totalAmountOfMoney = `₹ ${cartCtx.totalAmount.toFixed(2)}`;
  // const totalAmountOfMoney = 0;
  const hasItem = cartCtx.items.length > 0;

  const cartItemAddHandler = async (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
    const token = localStorage.getItem("token");

    console.log("CARTITEM = ", cartItem);

    const cartDetails = {
      id: cartItem.id,
    };
    const response = await fetch("http://localhost:8080/feed/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(cartDetails),
    });
  };

  const cartItemRemoveHandler = async (id) => {
    cartCtx.removeItem(id);

    const token = localStorage.getItem("token");
    const cartDetails = {
      id: id,
    };
    const response = await fetch(
      "http://localhost:8080/feed/delete-from-cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(cartDetails),
      }
    );
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const ModalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  let cartisEmpty = cartCtx.items.length === 0;

  const isSubmittingModalContent = <p>Sending Order Data ....</p>;

  const didSubmitModalCOntent = (
    <React.Fragment>
      <p>Successfully Sent The Order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmountOfMoney}</span>
      </div>
      {/* {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && ModalAction} */}
      <div className={classes.actions}>
        <button className={classes.button} onClick={showOrderHandler}>
          Order
        </button>
      </div>
      {orderIsShown && (
        <Modal onClose={hideOrderHandler}>
          <Checkout
            // onConfirm={submitOrderHandler}
            onCancel={hideOrderHandler}
          />
        </Modal>
      )}
    </React.Fragment>
  );

  return (
    <section className={classes.card}>
      <Card>
        {!cartisEmpty && cartModalContent}
        {cartisEmpty && <h2 style={{ textAlign: "center" }}>Cart Is Empty</h2>}
      </Card>
    </section>
  );
};

export default Cart;

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch("https://quick-meels-backend.onrender.com/feed/get-cart", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
    },
  });

  if (response.status !== 200) {
    const { message } = response.json();
    return json({ message: message });
  }
  return response;
}
