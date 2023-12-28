const { isAuthenticated } = require("@features/feature");
import Task from "@models/task";
const handler = async (req, res) => {
  try {
    const user = await isAuthenticated(req, res);
    if (user && req.method === "PUT") {
      const { id } = req.query;
      const task = await Task.findById(id);
      task.isCompleted = !task.isCompleted;
      task.save();
      return res.status(200).json({
        success: true,
        message: "Task Updated",
      });
    } else if (user && req.method === "DELETE") {
      const { id } = req.query;
      const task = await Task.findById(id);
      task.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Task Deleted",
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Only PUT and DELETE are allowed",
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Internal Server Errors",
    });
  }
};

export default handler;
