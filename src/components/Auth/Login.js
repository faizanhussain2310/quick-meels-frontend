import { Form, Link, redirect, json, useActionData } from "react-router-dom";

import classes from "./Login.module.css";

const Login = () => {
  const data = useActionData();
  return (
    <section className={classes.summary}>
      {data && data.message && <h3 style={{ color: "red" }}>{data.message}</h3>}
      <Form method="POST" className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className={classes.actions}>
          <button type="button" className={classes.submit}>
            <Link to="/signup">Signup</Link>
          </button>
          <button className={classes.submit}>Login</button>
        </div>
      </Form>
    </section>
  );
};

export default Login;

export async function action({ request }) {
  const data = await request.formData();
  const loginDetails = {
    email: data.get("email"),
    password: data.get("password"),
  };

  // console.log(loginDetails);

  const response = await fetch("https://quick-meels-backend.onrender.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });

  if (response.status !== 200) {
    const { message } = await response.json();
    return json({ message: message });
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
