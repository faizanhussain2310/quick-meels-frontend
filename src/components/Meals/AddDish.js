import { Form, json, redirect, useActionData } from "react-router-dom";

import classes from "./AddDish.module.css";

const AddDish = (props) => {
  const data = useActionData();
  console.log(data);

  // onSubmit={confirmHandler}
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
      {data && data.message && (
        <h3 style={{ color: "red", textAlign: "center" }}>{data.message}</h3>
      )}
      <div className={classes.control}>
        <label htmlFor="name">Name Of Dish</label>
        <input type="text" id="name" name="title" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="category">Category</label>
        {/* <input type="text" id="category" ref={categoryInputRef} required /> */}
        <select id="category" name="category">
          <option value="Veg">VEG</option>
          <option value="Non-Veg">NON-VEG</option>
        </select>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Add Dish</button>
      </div>
    </Form>
  );
};

export default AddDish;

export async function action({ request }) {
  const data = await request.formData();
  const meeldata = {
    title: data.get("title"),
    price: data.get("price"),
    category: data.get("category"),
  };
  console.log(meeldata);
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:8080/feed/meels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
    },
    body: JSON.stringify(meeldata),
  });
  if (response.status !== 200) {
    const { message, data } = await response.json();
    return json({ message: message, data: data });
  }
  return redirect("/");
}
