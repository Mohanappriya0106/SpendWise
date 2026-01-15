import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

/**
 * Monthly income vs expense summary
 */
const getMonthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const summary = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type"
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month"
          },
          totals: {
            $push: {
              type: "$_id.type",
              amount: "$total"
            }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate monthly summary"
    });
  }
};

/**
 * Category-wise expense summary
 */
const getCategorySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const summary = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense"
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.status(200).json({ summary });
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate category summary"
    });
  }
};

export { getMonthlySummary, getCategorySummary };
