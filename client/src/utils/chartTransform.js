export const transformMonthlyData = (data) => {
  return data.map((item) => {
    const result = {
      month: `${item._id.month}/${item._id.year}`,
      income: 0,
      expense: 0
    };

    item.totals.forEach((t) => {
      result[t.type] = t.amount;
    });

    return result;
  });
};

export const transformCategoryData = (data) => {
  return data.map((item) => ({
    name: item._id,
    value: item.total
  }));
};
