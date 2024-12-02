import express from 'express';
import { handleAddTask } from '../controllers/task.js';
import {protectRoute} from '../lib/protectRoute.js'
const router = express.Router();

router.post('/task',protectRoute,handleAddTask)


export default router;