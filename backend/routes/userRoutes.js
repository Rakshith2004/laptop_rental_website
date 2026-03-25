import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userContoller.js";

import { protect } from "../middleware/authMiddleware.js";

import { Router } from "express";

const router = Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/profile", protect, getUserProfile);

export default router;
