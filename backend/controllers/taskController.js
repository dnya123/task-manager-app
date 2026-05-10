
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
   const task = await Task.create({
  ...req.body,
  userId: req.user.id,
});
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
    userId: req.user.id,
});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};