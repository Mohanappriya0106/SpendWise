import Budget from "../models/Budget.js";

export const getBudget = async (req, res) => {
  const budget = await Budget.findOne({ user: req.user.id });
  res.json(budget);
};

export const setBudget = async (req, res) => {
  const { monthlyBudget } = req.body;

  const budget = await Budget.findOneAndUpdate(
    { user: req.user.id },
    { monthlyBudget },
    { upsert: true, new: true }
  );

  res.json(budget);
};
