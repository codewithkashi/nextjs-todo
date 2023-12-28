"use client";
import React from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "@components/clients";
import "@styles/profile.css";
const Profile = () => {
  const { user } = useContext(Context);

  return (
    <div className="profile-container">
      <h1 className="profile-data">Username: {user?.name}</h1>
      <h3 className="profile-data">Email: {user?.email}</h3>
    </div>
  );
};

export default Profile;
