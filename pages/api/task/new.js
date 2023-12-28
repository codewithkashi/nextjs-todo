import { isAuthenticated } from "@features/feature";
import Task from "@models/task";
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).json({
      success: false,
      message: "Only POST is allowed",
    });
  }
  const user = await isAuthenticated(req, res);
  if (user) {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: user._id,
    });
    res.status(200).json({
      success: true,
      message: "Task Created",
    });
  }
};

export default handler;
