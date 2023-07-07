import { json, useLoaderData } from "react-router-dom";

import React, { Fragment } from "react";

import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  // console.log("UU");
  const { meels } = useLoaderData();
  console.log(meels);
  return (
    <Fragment>
      <MealsSummary />
      <AvailableMeals meels={meels} />
    </Fragment>
  );
};

export default Meals;

export async function loader() {
  const response = await fetch("http://localhost:8080/feed/meels");
  if (response.status !== 200) {
    const { message } = await response.json();
    throw new json({ message: message });
  }
  return response;
}
