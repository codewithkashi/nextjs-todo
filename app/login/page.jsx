"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import "@styles/register.css";
import { Context } from "@components/clients";
import axios from "axios";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
const Login = () => {
  const { auth, setIsAuth, user, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      {
        response.data.success
          ? (toast.success(response.data.message), setIsAuth(true))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (auth) return redirect("/");
  return (
    <div className="form-container">
      <form className="form" onSubmit={submitHanler}>
        <h1>Sign in</h1>
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button className="button login">Sign in</button>
        </div>
        <span>
          Not a user <Link href={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
