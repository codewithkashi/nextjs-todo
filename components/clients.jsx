"use client";
import { useState, createContext } from "react";
import { Toaster } from "react-hot-toast";

export const Context = createContext();
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [task, setTask] = useState([]);
  const [auth, setIsAuth] = useState(false);

  return (
    <Context.Provider value={{ user, setUser, task, setTask, auth, setIsAuth }}>
      {children}
      <Toaster />
    </Context.Provider>
  );
};
