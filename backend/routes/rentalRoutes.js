import { Router } from "express";
import {
  createRental,
  getUserRentals,
  returnLaptop,
  cancelRental,
} from "../controllers/rentalController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, getUserRentals);
router.post("/", protect, createRental);
router.put("/:id", protect, returnLaptop);
router.delete("/:id", protect, cancelRental);

export default router;
