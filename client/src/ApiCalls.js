import { CURRENT_USER_URL, LOGIN_URL, LOGOUT_URL } from "../config";

export const fetchCurrentUser = async () => {
  const response = await fetch(CURRENT_USER_URL, {
    method: "GET",
    credentials: "include",
  });
  if (response.status !== 200) {
    // console.log({ status: response.status, text: response.statusText });
    return null;
  }
  return response.json();
};

export const login = async (event) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
  });
  return response.json();
};

export const logout = async () => {
  return await fetch(LOGOUT_URL, {
    method: "GET",
    credentials: "include",
  });
};

const getData = async (url, data) => {
  return await fetch(url, {
    method: "GET",
    credentials: "include",
  });
};

export const postData = async (url, data) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};
