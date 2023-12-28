"use client";
import { Context } from "./clients";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import axios from "axios";
import Link from "next/link";
const LogoutMenu = () => {
  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/user/logout");
      toast.success(response.data.message);
      setIsAuth(false);
      redirect("/");
    } catch (error) {
      //   toast.error(error.message);
    }
  };
  const { auth, setIsAuth } = useContext(Context);
  return (
    <>
      {auth ? (
        <>
          <Link href={"/profile"}>Profile</Link>
          <Link href={"/"} onClick={logoutHandler}>
            Logout
          </Link>
        </>
      ) : (
        <>
          {" "}
          <Link href={"/login"}>Login</Link>
          <Link href={"/register"}>Register</Link>
        </>
      )}
    </>
  );
};

export default LogoutMenu;
