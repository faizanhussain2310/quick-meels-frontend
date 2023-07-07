import {
  json,
  redirect,
  useLoaderData,
  Form,
  useActionData,
} from "react-router-dom";

import classes from "./EditDish.module.css";

const EditDish = () => {
  const { meel } = useLoaderData();
  const data = useActionData();
  console.log("DATA", data);
//   console.log("SINGLE MEEL = ", meel);
  return (
    <section className={classes.card}>
      <Form method="POST">
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
          <input
            type="text"
            id="name"
            name="title"
            required
            defaultValue={meel.title}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            required
            defaultValue={meel.price}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={meel.category}>
            <option value="Veg">VEG</option>
            <option value="Non-Veg">NON-VEG</option>
          </select>
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>Save</button>
        </div>
      </Form>
    </section>
  );
};

export default EditDish;

export async function loader({ params, request }) {
  const dishId = params.dishId;
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const response = await fetch(
    "https://quick-meels-backend.onrender.com/feed/my-meels/edit/" + dishId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    }
  );
  if (response.status !== 200) {
    const { message } = response.json();
    return json({ message: message });
  }
  return response;
}

export async function action({ params, request }) {
  const dishId = params.dishId;
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }
  const data = await request.formData();
  const meelDetails = {
    title: data.get("title"),
    price: data.get("price"),
    category: data.get("category"),
  };
  console.log("MEELDETAILS = ", meelDetails);
  const response = await fetch(
    "https://quick-meels-backend.onrender.com/feed/my-meels/edit/" + dishId,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify(meelDetails),
    }
  );
  if (response.status !== 200) {
    const { message, data } = await response.json();
    return json({ message: message, data: data });
  }
  return redirect("/my-dishes");
}
