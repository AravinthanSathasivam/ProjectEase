import { useEffect } from "react";

import { IUser } from "./types";
import { useUser } from "./useUser.ts"
import { useLocalStorage } from "./useLocalStorage.ts";

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: IUser) => {
    addUser(user);
  }
  
  const logout = () => {
    removeUser();
  }

  return { user, login, logout };
};
