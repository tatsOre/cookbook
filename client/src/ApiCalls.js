import { CURRENT_USER_URL, LOGOUT_URL, CLIENT_ASSET_URL } from "../config";

export const fetchCurrentUser = async () => {
  const response = await fetch(CURRENT_USER_URL, {
    method: "GET",
    credentials: "include",
  });
  if (response.status !== 200) return null;
  return response.json();
};

export const fetchAPI = (method, url, data = {}) => {
  return fetch(url, {
    method,
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export const getData = (url) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export const logout = () => {
  return getData(LOGOUT_URL);
};

export const getClientAsset = async (category, value) => {
  const URL = CLIENT_ASSET_URL(category, value);

  console.log({ URL });
  return getData(URL);
};
