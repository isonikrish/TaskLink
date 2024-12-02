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
