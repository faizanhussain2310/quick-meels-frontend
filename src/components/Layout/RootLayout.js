import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import { Fragment, useEffect } from "react";

import Header from "./Header";

import { getTokenExpiration } from "../utils/Auth";

const RootLayout = () => {
  const token = useLoaderData();
  console.log("TOKEN = ", token);
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }

    const tokenDuration = getTokenExpiration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <Fragment>
      <Header token={token} />
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
};

export default RootLayout;
