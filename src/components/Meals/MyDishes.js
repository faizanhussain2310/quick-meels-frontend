import { redirect, json, useLoaderData, Form, NavLink } from "react-router-dom";

import { useState } from "react";

import classes from "./MyDishes.module.css";
import Modal from "../UI/Modal";
import AddDish from "./AddDish";

const MyDishes = () => {
  const [dishInput, setDishInput] = useState(false);

  const showDishInputHandler = () => {
    setDishInput(true);
  };

  const hideDishInputHandler = () => {
    setDishInput(false);
  };

  const data = useLoaderData();
  const { meels, restaurant } = data;
  const isMeels = meels.length > 0;

  return (
    <section className={classes.card}>
      <div className={classes.actions}>
        <h2 style={{ textDecorationLine: "underline" }}>{restaurant}</h2>
        <button className={classes.button} onClick={showDishInputHandler}>
          Add Dish
        </button>
      </div>
      {dishInput && (
        <Modal onClose={hideDishInputHandler}>
          <AddDish onCancel={hideDishInputHandler} />
        </Modal>
      )}
      {!isMeels && <h2>No Dishes From Your Restaurant</h2>}
      {isMeels && (
        <ul>
          {meels.map((meel) => (
            <li key={meel._id} className={classes.meal}>
              <div style={{ textAlign: "left" }}>
                <h3>{meel.title}</h3>
                <div className={classes.description}>{meel.category}</div>
                <div className={classes.price}>₹ {meel.price.toFixed(2)}</div>
              </div>
              <div className={classes.actionsagain}>
                <NavLink to={`/my-dishes/edit/${meel._id}`}>
                  <button className={classes.button}>Edit</button>
                </NavLink>
                <Form method="POST" action={`/my-dishes/delete/${meel._id}`}>
                  <button className={classes.button}>Delete</button>
                </Form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MyDishes;

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch("http://localhost:8080/feed/my-meels", {
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
