import { useRouteError } from "react-router-dom";
import classes from "./ErrorPage.module.css";
import Header from "./Header";

function ErrorPage() {
  const error = useRouteError();

  const token = localStorage.getItem("token");

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.data.message) {
    message = error.data.message;
  }

  return (
    <>
      <Header token={token} />
      <div className={classes.content}>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </>
  );
}

export default ErrorPage;
