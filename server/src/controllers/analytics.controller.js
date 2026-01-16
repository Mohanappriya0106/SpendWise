import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

/**
 * Monthly income vs expense summary
 */
const getMonthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { startDate, endDate } = req.query;

    const match = {
      user: userId
    };

    if (startDate && endDate) {
      match.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const summary = await Transaction.aggregate([
      { $match: match },
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
  } catch {
    res.status(500).json({ message: "Failed to generate summary" });
  }
};


/**
 * Category-wise expense summary
 */
const getCategorySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { startDate, endDate, category } = req.query;

    const match = {
      user: userId,
      type: "expense"
    };

    if (startDate && endDate) {
      match.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    if (category) {
      match.category = category;
    }

    const summary = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.status(200).json({ summary });
  } catch {
    res.status(500).json({ message: "Failed to generate category summary" });
  }
};


export { getMonthlySummary, getCategorySummary };
