import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    userId: req.user.id
  });
});

export default router;
