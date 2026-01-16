import api from "./axios";

export const fetchMonthlySummary = (params) => {
  return api.get("/analytics/monthly-summary", { params });
};

export const fetchCategorySummary = (params) => {
  return api.get("/analytics/category-summary", { params });
};

