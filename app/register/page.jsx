"use client";
import React, { useState } from "react";
import Link from "next/link";
import "@styles/register.css";
import { toast } from "react-hot-toast";

import { redirect } from "next/navigation";
import axios from "axios";
const Register = () => {
  const [registered, setIsRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHanler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          name,
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
          ? (toast.success(response.data.message), setIsRegistered(true))
          : toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  if (registered) return redirect("/login");
  return (
    <div className="form-container">
      <form onSubmit={submitHanler} className="form">
        <h1>Sign up</h1>

        <input
          type="text"
          placeholder="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <button className="button login">Sign up</button>
        </div>
        <span>
          Already member <Link href={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
