import User from "@models/user";
import bcrypt from "bcrypt";
import { connectDB } from "@databases/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).json({
      success: false,
      message: "Only POST is allowed",
    });
  }

  try {
    await connectDB();
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user != null) {
      res.status(200).json({
        success: false,
        message: "User already exists",
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return res.status(201).json({
      success: true,
      message: "User registered",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
