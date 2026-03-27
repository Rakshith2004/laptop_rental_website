import { Router } from "express";
import {
  getAllLaptops,
  getLaptopById,
  addLaptop,
  updateLaptop,
  deleteLaptop,
  checkAvailability,
} from "../controllers/laptopController.js";

const router = Router();

router.get("/", getAllLaptops);
router.get("/:id", getLaptopById);
router.post("/", addLaptop);
router.put("/:id", updateLaptop);
router.delete("/:id", deleteLaptop);
router.get("/availability/:id", checkAvailability);

export default router;
