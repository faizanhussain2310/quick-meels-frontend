import { Form, json, redirect, useActionData } from "react-router-dom";
import { useState, useRef } from "react";

import classes from "./Signup.module.css";

const Signup = () => {
  const data = useActionData();
  console.log(data);

  return (
    <section className={classes.summary}>
      {data && data.data && (
        <>
          {data.data.map((err) => (
            <h3 key={err.path} style={{ color: "red" }}>
              {err.msg}
            </h3>
          ))}
        </>
      )}
      {data && !data.data && data.message && (
        <h3 style={{ color: "red" }}>{data.message}</h3>
      )}
      <Form method="POST" className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="restaurant">Restaurant's Name</label>
          <input type="text" id="restaurant" name="restaurant" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            required
          />
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>Signup</button>
        </div>
      </Form>
    </section>
  );
};

export default Signup;

export async function action({ request }) {
  const data = await request.formData();
  const signupDetails = {
    email: data.get("email"),
    name: data.get("name"),
    password: data.get("password"),
    confirmpassword: data.get("confirmpassword"),
    restaurant: data.get("restaurant"),
  };

  // console.log(signupDetails);

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupDetails),
  });

  if (response.status !== 200) {
    const { message, data } = await response.json();
    return json({ message: message, data: data });
  }

  return redirect("/login");
}
