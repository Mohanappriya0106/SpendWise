export const calculateActualExpense = (transactions) =>
  transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
