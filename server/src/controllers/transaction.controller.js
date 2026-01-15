import Transaction from "../models/Transaction.js";

/**
 * Create a new transaction
 */
const createTransaction = async (req, res) => {
  try {
    const { type, amount, category, note, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      amount,
      category,
      note,
      date
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create transaction"
    });
  }
};

/**
 * Get all transactions for logged-in user
 */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id
    }).sort({ date: -1 });

    res.status(200).json({
      transactions
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions"
    });
  }
};

/**
 * Update a transaction (only if owned by user)
 */
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction updated successfully",
      transaction
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update transaction"
    });
  }
};

/**
 * Delete a transaction (only if owned by user)
 */
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    res.status(200).json({
      message: "Transaction deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction"
    });
  }
};


export {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction
};

