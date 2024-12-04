import Task from "../models/task.js";
import { taskSchema } from "../lib/zodSchemas.js";

export async function handleAddTask(req, res) {
  try {
    const data = req.body;
    const user = req.user;
    const validatedData = taskSchema.safeParse(data);
    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.errors,
      });
    }

    const { task, description, date, startTime, endTime } = validatedData.data;

    const newTask = new Task({
      userId: user._id,
      task,
      description,
      date,
      startTime,
      endTime,
    });

    await newTask.save();
    res.status(201).json({ msg: "New Task Created" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error" });
  }
}
export async function fetchTasks(req, res) {
  const userId = req.user._id;
  try {
    const response = await Task.find({ userId ,status: "Pending" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
}
export async function fetchCompletedTasks(req, res) {
  const userId = req.user._id;
  try {
    const response = await Task.find({ userId ,status: "Completed" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
}