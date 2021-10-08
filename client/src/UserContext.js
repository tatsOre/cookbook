import { createContext, useEffect, useState } from "react";
import { CURRENT_USER_URL } from "../config";

export const fetchCurrentUser = async () => {
  const response = await fetch(CURRENT_USER_URL, {
    method: "GET",
    credentials: "include",
  });
  if (response.status !== 200) {
    console.log({ status: response.status, text: response.statusText });
    return null;
  }
  return response.json();
};

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);

  const { Provider } = userContext;

  return <Provider value={{ user }}>{children}</Provider>;
};
