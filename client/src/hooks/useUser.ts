import { useContext } from "react";

import { AuthContext } from "../context/AuthContext.ts";
import { useLocalStorage } from "./useLocalStorage.ts";
import { IUser } from "./types.ts";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user: IUser) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser };
};
