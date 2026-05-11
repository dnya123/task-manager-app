import User from "../models/User.js";
import Task from "../models/Task.js";

export const getAdminStats = async (req, res, next) => {
  try {
    // 1. Check admin access
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 2. Count users
    const totalUsers = await User.countDocuments();

    // 3. Count tasks
    const totalTasks = await Task.countDocuments();

    // 4. Completed tasks
    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    // 5. Pending tasks
    const pendingTasks = await Task.countDocuments({
      status: "Pending",
    });

    // 6. Send response
    res.json({
      totalUsers,
      totalTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    next(error);
  }
};