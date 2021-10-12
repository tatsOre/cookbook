import { createContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "./ApiCalls";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    console.log("First time in use effect");
    fetchCurrentUser()
      .then((res) => setUser(res))
      .catch((err) => console.log("err:", err));
  }, [alert]);

  const { Provider } = userContext;

  return (
    <Provider value={{ user, setUser, alert, setAlert }}>{children}</Provider>
  );
};
