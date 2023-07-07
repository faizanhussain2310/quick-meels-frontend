import { redirect, json } from "react-router-dom";

export async function action({ params, request }) {
  const dishId = params.dishId;
  const token = localStorage.getItem("token");
  const response = await fetch(
    "https://quick-meels-backend.onrender.com/feed/my-meels/delete/" + dishId,
    {
      method: "POST",
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
  return redirect("/my-dishes");
}
