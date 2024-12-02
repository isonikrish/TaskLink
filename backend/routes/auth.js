import express from 'express';
import {handleLogin, handleLogout, handleSignup, handleGetMe} from '../controllers/auth.js'
import { protectRoute } from '../lib/protectRoute.js';

const router = express.Router()

router.post("/signup",handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout)
router.get("/me",protectRoute,handleGetMe);
export default router;