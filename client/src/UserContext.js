import { createContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "./ApiCalls";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then((res) => setUser(res))
      .catch((err) => console.log("err:", err));
  }, [alert]);

  const { Provider } = userContext;

  return (
    <Provider value={{ user, setUser, alert, setAlert }}>{children}</Provider>
  );
};
