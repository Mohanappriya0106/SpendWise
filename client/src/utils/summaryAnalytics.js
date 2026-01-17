// =====================
// SECTION 1 — KPI METRICS
// =====================
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

// =====================
// SECTION 2 — INCOME VS EXPENSE (MONTHLY)
// =====================
export const buildIncomeExpenseSeries = (
  transactions,
  startDate,
  endDate
) => {
  const map = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);

    if (
      (!startDate || d >= new Date(startDate)) &&
      (!endDate || d <= new Date(endDate))
    ) {
      // ✅ zero-padded month for correct sorting
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const key = `${d.getFullYear()}-${month}`;

      if (!map[key]) {
        map[key] = { income: 0, expense: 0 };
      }

      map[key][t.type] += t.amount;
    }
  });

  // ✅ sort chronologically using Date
  const sortedKeys = Object.keys(map).sort(
    (a, b) => new Date(`${a}-01`) - new Date(`${b}-01`)
  );

  // ✅ convert to readable labels (Jan 2025)
  const categories = sortedKeys.map((k) => {
    const [year, month] = k.split("-");
    return new Date(year, month - 1).toLocaleString("default", {
      month: "short",
      year: "numeric"
    });
  });

  return {
    categories,
    income: sortedKeys.map((k) => map[k].income),
    expense: sortedKeys.map((k) => map[k].expense)
  };
};

// =====================
// SECTION 3 — CATEGORY PIE CHART
// =====================
export const buildCategorySeries = (
  transactions,
  startDate,
  endDate,
  type
) => {
  const map = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);

    if (type && t.type !== type) return;
    if (startDate && d < new Date(startDate)) return;
    if (endDate && d > new Date(endDate)) return;

    map[t.category] = (map[t.category] || 0) + t.amount;
  });

  return {
    labels: Object.keys(map),
    values: Object.values(map)
  };
};

