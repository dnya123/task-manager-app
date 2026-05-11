import Task from "../models/Task.js";

/* ---------------- CREATE TASK ---------------- */
export const createTask = async (req, res, next) => {
  try {
    console.log("Task Created");

    const task = await Task.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/* ---------------- GET TASKS (OPTIMIZED) ---------------- */
export const getTasks = async (req, res, next) => {
  try {
    console.log("Fetching Tasks");

    const { status, search, sort } = req.query;
    const page = Number(req.query.page) || 1;

    const limit = 5;
    const skip = (page - 1) * limit;

    /* ---------------- QUERY BUILDING ---------------- */
    let query = {};

    // Role-based access
    if (req.user.role === "user") {
      query.userId = req.user.id;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    /* ---------------- SORT OPTIMIZATION ---------------- */
    const sortOption =
      sort === "new"
        ? { createdAt: -1 }
        : sort === "old"
        ? { createdAt: 1 }
        : {};

    /* ---------------- OPTIMIZED DB CALLS ---------------- */
    const [total, tasks] = await Promise.all([
      Task.countDocuments(query),

      Task.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
    ]);

    /* ---------------- RESPONSE ---------------- */
    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------- UPDATE TASK (SECURE + OPTIMIZED) ---------------- */
export const updateTask = async (req, res, next) => {
  try {
    console.log("Task Updated");

    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id, // 🔐 security fix
      },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/* ---------------- DELETE TASK (SECURE + OPTIMIZED) ---------------- */
export const deleteTask = async (req, res, next) => {
  try {
    console.log("Task Deleted");

    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id, // 🔐 security fix
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};