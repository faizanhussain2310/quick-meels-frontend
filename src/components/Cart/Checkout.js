import { Form, json, redirect, useActionData } from "react-router-dom";

import { useContext } from "react";

import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

let items = [];
let totalAmount = 0;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const data = useActionData();
  console.log(data);

  items = cartCtx.items;
  totalAmount = cartCtx.totalAmount;

  return (
    <Form method="POST" className={classes.form}>
      {data && data.data && (
        <>
          {data.data.map((err) => (
            <h3 key={err.path} style={{ color: "red", textAlign: "center" }}>
              {err.msg}
            </h3>
          ))}
        </>
      )}
      {data && data.message && !data.data && (
        <h3 style={{ color: "red", textAlign: "center" }}>{data.message}</h3>
      )}
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" name="address" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="landmark">Landmark</label>
        <input type="landmark" id="landmark" name="landmark" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="pin">Pin Code</label>
        <input type="text" id="pin" name="pin" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" name="city" required />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </Form>
  );
};

export default Checkout;

export async function action({ request }) {
  console.log("ITEMS = ", items);
  const data = await request.formData();
  const orderDetails = {
    address: data.get("address"),
    landmark: data.get("landmark"),
    pincode: data.get("pin"),
    city: data.get("city"),
    items: items,
    totalAmount: totalAmount,
  };
  const token = localStorage.getItem("token");
  console.log("ORDERDETAILS = ", orderDetails);
  const response = await fetch("https://quick-meels-backend.onrender.com/feed/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(orderDetails),
  });

  if (response.status !== 200) {
    const { message, data } = await response.json();
    return json({ message: message, data: data });
  }

  return redirect("/orders");
}
