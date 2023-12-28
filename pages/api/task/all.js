import { isAuthenticated } from "@features/feature";
import Task from "@models/task";
const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(200).json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  const user = await isAuthenticated(req, res);
  if (user) {
    try {
      const userTasks = await Task.find({ user: user._id });
      res.status(200).json({
        success: true,
        userTasks,
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};

export default handler;
