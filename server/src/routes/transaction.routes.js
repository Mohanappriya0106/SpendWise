import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createTransactionSchema
} from "../validations/transaction.validation.js";
import {
  createTransaction,
  getTransactions
} from "../controllers/transaction.controller.js";
import {
  updateTransactionSchema
} from "../validations/transaction.validation.js";
import {
  updateTransaction,
  deleteTransaction
} from "../controllers/transaction.controller.js";


const router = express.Router();

// Create transaction
router.post(
  "/",
  authMiddleware,
  validate(createTransactionSchema),
  createTransaction
);

// Get all transactions for logged-in user
router.get(
  "/",
  authMiddleware,
  getTransactions
);

// Update transaction
router.patch(
  "/:id",
  authMiddleware,
  validate(updateTransactionSchema),
  updateTransaction
);

// Delete transaction
router.delete(
  "/:id",
  authMiddleware,
  deleteTransaction
);

export default router;
