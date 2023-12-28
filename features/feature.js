import { connectDB } from "@databases/db";
import User from "@models/user";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res) => {
  try {
    await connectDB();
    const { token } = req.cookies;
    if (token) {
      const decodedToken = jwt.verify(token, "kashif");
      const user = await User.findById(decodedToken._id);
      if (user != null) {
        return user;
      }
    }
    return res.status(200).json({
      success: false,
      message: "Login first",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Server Error",
    });
    return false;
  }
};
