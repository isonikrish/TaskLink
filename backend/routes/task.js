import express from 'express';
import { handleAddTask, fetchTasks, fetchCompletedTasks } from '../controllers/task.js';
import {protectRoute} from '../lib/protectRoute.js'
const router = express.Router();

router.post('/task',protectRoute,handleAddTask)
router.get('/getTasks',protectRoute,fetchTasks)
router.get('/getCompletedTasks',protectRoute,fetchCompletedTasks)


export default router;