import api from "./axios";

export const fetchMonthlySummary = () => {
  return api.get("/analytics/monthly-summary");
};

export const fetchCategorySummary = () => {
  return api.get("/analytics/category-summary");
};
