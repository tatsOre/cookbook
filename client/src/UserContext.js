import { createContext, useEffect, useState } from "react";
import { fetchCurrentUser } from "./ApiCalls";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then((res) => setUser(res))
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => setUser(null);

  const { Provider } = userContext;

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};
