import express from "express";

const router = express.Router();

// Temporary public source (replaceable later)
router.get("/", async (req, res) => {
  try {
    // Example public endpoint (fallback-style)
    const gold = 6500;   // INR per gram (temporary real-world approx)
    const silver = 75;   // INR per gram

    res.json({
      gold,
      silver,
      updatedAt: new Date()
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch market prices" });
  }
});

export default router;
