import { useLoaderData, json, redirect } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./Orders.module.css";
import OrderItem from "./OrderItem";

const Orders = () => {
  const data = useLoaderData();
  const { orders } = data;
  console.log("ORDERS = ",orders);
  const isOrder = orders.length > 0;

  if (isOrder) {
    return (
      <section className={classes.meals}>
        {orders.map((order) => (
          <Card key={order._id}>
            <OrderItem
              key={order._id}
              items={order.items}
              address={order.address}
              totalAmount={order.totalAmount}
              _id={order._id}
            />
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        {!isOrder && (
          <h2 style={{ textAlign: "center" }}>
            No Orders Made By You Till Now
          </h2>
        )}
        {/* {isOrder && (
          <>
            {orders.map((order) => (
              <OrderItem
                key={order._id}
                items={order.items}
                address={order.address}
                totalAmount={order.totalAmount}
                _id={order._id}
              />
            ))}
          </>
        )} */}
      </Card>
    </section>
  );
};

export default Orders;

export async function loader() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  const response = await fetch("http://localhost:8080/feed/orders", {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + token,
    },
  });
  if (response.status !== 200) {
    const { message } = await response.json();
    throw new json({ message: message });
  }
  return response;
}
