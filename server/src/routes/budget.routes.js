import express from "express";
import { getBudget, setBudget } from "../controllers/budget.controller.js";
import protect from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/", protect, getBudget);
router.post("/", protect, setBudget);

export default router;
