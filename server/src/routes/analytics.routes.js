import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getMonthlySummary,
  getCategorySummary
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/monthly-summary", authMiddleware, getMonthlySummary);
router.get("/category-summary", authMiddleware, getCategorySummary);

export default router;
