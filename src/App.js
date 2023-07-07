import React, { Fragment, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Layout/Header";
import Meals, { loader as meelsLoader } from "./components/Meals/Meals";
import Cart, { loader as cartLoader } from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import EditDish, {
  loader as editMeelLoader,
  action as editMeelAction,
} from "./components/Meals/EditDish";

import ErrorPage from "./components/Layout/ErrorPage";
import RootLayout from "./components/Layout/RootLayout";
import Orders, { loader as ordersLoader } from "./components/order/Orders";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./components/Auth/Login";
import Signup, {
  action as signupAction,
  loader as signupLoader,
} from "./components/Auth/Signup";
import MyDishes, {
  loader as myDishesLoader,
} from "./components/Meals/MyDishes";

import { action as meelAddHandlerAction } from "./components/Meals/AddDish";

import { action as cartHandlerAction } from "./components/Cart/Checkout";

import { action as logoutAction } from "./components/Auth/Logout";

import { tokenLoader, checkAuthloader } from "./components/utils/Auth";

import { action as removeMeelAction } from "./components/Meals/RemoveDish";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      loader: tokenLoader,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Meals />, loader: meelsLoader },
        {
          path: "login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "cart",
          element: <Cart />,
          action: cartHandlerAction,
          loader: cartLoader,
        },
        { path: "orders", element: <Orders />, loader: ordersLoader },
        {
          path: "signup",
          element: <Signup />,
          action: signupAction,
        },
        {
          path: "my-dishes",
          element: <MyDishes />,
          action: meelAddHandlerAction,
          loader: myDishesLoader,
        },
        { path: "logout", action: logoutAction },
        { path: "my-dishes/delete/:dishId", action: removeMeelAction },
        {
          path: "my-dishes/edit/:dishId",
          element: <EditDish />,
          loader: editMeelLoader,
          action: editMeelAction,
        },
      ],
    },
  ]);

  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
