import { connectDB } from "@databases/db";
import User from "@models/user";
import jwt from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  try {
    await connectDB();
    const { token } = req.cookies;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "Login First",
      });
    }
    const decodedToken = jwt.verify(token, "kashif");
    const user = await User.findById(decodedToken._id);
    if (user) {
      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Cookie did not Match",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
