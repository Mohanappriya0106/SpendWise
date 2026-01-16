export const getCurrentMonthSummary = (transactions) => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d.getMonth() === month && d.getFullYear() === year) {
      if (t.type === "income") income += t.amount;
      if (t.type === "expense") expense += t.amount;
    }
  });

  return {
    income,
    expense,
    net: income - expense
  };
};
