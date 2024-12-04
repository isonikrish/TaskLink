import express from 'express';
import { handleAddTask, fetchTasks, fetchCompletedTasks,handleCompleteTask ,deleteTask, fetchAllTasks} from '../controllers/task.js';
import {protectRoute} from '../lib/protectRoute.js'
const router = express.Router();

router.post('/task',protectRoute,handleAddTask)
router.get('/getTasks',protectRoute,fetchTasks)
router.get('/getCompletedTasks',protectRoute,fetchCompletedTasks)
router.put("/changeTaskStatus/:id", protectRoute, handleCompleteTask);
router.delete("/delete/:id",protectRoute, deleteTask)
router.get("/getAllTasks",protectRoute,fetchAllTasks)

export default router;