export const buildSummaryMetrics = (transactions, startDate, endDate) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (
      (!startDate || d >= new Date(startDate)) &&
      (!endDate || d <= new Date(endDate))
    ) {
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

export const buildIncomeExpenseSeries = (transactions, startDate, endDate) => {
  const map = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (
      (!startDate || d >= new Date(startDate)) &&
      (!endDate || d <= new Date(endDate))
    ) {
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      if (!map[key]) map[key] = { income: 0, expense: 0 };
      map[key][t.type] += t.amount;
    }
  });

  const labels = Object.keys(map).sort();
  return {
    categories: labels,
    income: labels.map((l) => map[l].income),
    expense: labels.map((l) => map[l].expense)
  };
};

export const buildCategorySeries = (
  transactions,
  startDate,
  endDate,
  type
) => {
  const filtered = transactions.filter((t) => {
    const txDate = new Date(t.date);

    if (type && t.type !== type) return false;
    if (startDate && txDate < new Date(startDate)) return false;
    if (endDate && txDate > new Date(endDate)) return false;

    return true;
  });

  const map = {};

  filtered.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map)
  };
};

