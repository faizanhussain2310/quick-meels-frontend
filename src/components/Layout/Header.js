import React, { Fragment, useState } from "react";

import { NavLink, Form } from "react-router-dom";
import { CgMenu } from "react-icons/cg";

import classes from "./Header.module.css";
import mealsImage from "../../assets/bg.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  const [isMenu, setIsMenu] = useState(false);

  let navClass = `${classes["side-menu-toggle"]}`;

  let backdropCLass = `${classes.backdrop}`;

  if (isMenu) {
    navClass = `${classes["mobile-nav"]} ${classes.open}`;
    backdropCLass = `${classes.backdrop} ${classes.open}`;
  } else {
    navClass = `${classes["mobile-nav"]}`;
    backdropCLass = `${classes.backdrop}`;
  }

  const closeHandler = () => {
    setIsMenu(false);
  };

  const openHandler = () => {
    setIsMenu(true);
  };

  return (
    <Fragment>
      <div className={backdropCLass} onClick={closeHandler}></div>
      <header className={classes.header}>
        {/* <button className={classes["side-menu-toggle"]} onClick={openHandler}>Menu</button> */}
        <CgMenu className={classes.menuclass} onClick={openHandler} />
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
        >
          QuickMeels
        </NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/cart">
          <HeaderCartButton />
        </NavLink>
        <NavLink to="/my-dishes">My Dishes</NavLink>
        {!props.token && <NavLink to="/login">Login</NavLink>}
        {props.token && (
          <Form action="/logout" method="POST">
            <button className={classes.button}>Logout</button>
          </Form>
        )}
      </header>

      <nav className={navClass}>
        <ul className={classes["mobile-nav__item-list"]}>
          <li className={classes["mobile-nav__item"]}>
            <NavLink to="/" onClick={closeHandler}>
              QuickMeels
            </NavLink>
          </li>
          <li className={classes["mobile-nav__item"]}>
            <NavLink to="/orders" onClick={closeHandler}>
              Orders
            </NavLink>
          </li>
          <li className={classes["mobile-nav__item"]}>
            <NavLink to="/cart" onClick={closeHandler}>
              <HeaderCartButton />
            </NavLink>
          </li>
          <li className={classes["mobile-nav__item"]}>
            <NavLink to="/my-dishes" onClick={closeHandler}>
              My Dishes
            </NavLink>
          </li>
          {!props.token && (
            <li className={classes["mobile-nav__item"]}>
              <NavLink to="/login" onClick={closeHandler}>
                Login
              </NavLink>
            </li>
          )}
          {props.token && (
            <li className={classes["mobile-nav__item"]}>
              <Form action="/logout" method="POST">
                <button className={classes.button} onClick={closeHandler}>
                  Logout
                </button>
              </Form>
            </li>
          )}
        </ul>
      </nav>

      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A TAble Full Of Delicious Food!" />
      </div>
    </Fragment>
  );
};

export default Header;
