import { BehaviorSubject } from "rxjs";
import { useState, useEffect } from "react";

const API_SERVER = "http://localhost:8000";

// rxjs for reactive programming, to share access toke accross mirco frontends
export const jwt = new BehaviorSubject(null);
export const cart = new BehaviorSubject(null);

export const login = (username, password) =>
  fetch(`${API_SERVER}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      jwt.next(data.access_token);
      getCart();
      return data.access_token;
    });

// Custom Hook, Simply return login status
export function useLoggedIn() {
  const [loggenIn, setLoggedIn] = useState(!!jwt.value);

  useEffect(() => {
    setLoggedIn(!!jwt.value);
    return jwt.subscribe(() => setLoggedIn(!!jwt.value));
  }, []);
  return loggenIn;
}

export const getCart = () =>
  fetch(`${API_SERVER}/cart`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Cart Data", data);
      cart.next(data);
      return data;
    });

export const addToCart = (id) =>
  fetch(`${API_SERVER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
    body: JSON.stringify({ id }),
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });

export const clearCart = () =>
  fetch(`${API_SERVER}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt.value}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      getCart();
    });
