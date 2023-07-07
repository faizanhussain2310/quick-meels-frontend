import { redirect } from "react-router-dom";

export function getTokenExpiration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);

  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenExpiration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthloader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/");
  }
  return null;
}
