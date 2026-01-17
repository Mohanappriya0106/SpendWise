import { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";
import DateRangeFilter from "../components/DateRangeFilter";
import SummaryKpis from "../components/SummaryKpis";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import ExpenseCategoryChart from "../components/charts/ExpenseCategoryChart";
import Card from "../components/ui/Card";

import {
  buildSummaryMetrics,
  buildIncomeExpenseSeries,
  buildCategorySeries
} from "../utils/summaryAnalytics";

const Summary = () => {
  const [transactions, setTransactions] = useState([]);

  // Section filters
  const [kpiFilters, setKpiFilters] = useState({});
  const [barFilters, setBarFilters] = useState({});
  const [pieFilters, setPieFilters] = useState({});

  // Section data
  const [metrics, setMetrics] = useState({ income: 0, expense: 0, net: 0 });
  const [barData, setBarData] = useState({
    categories: [],
    income: [],
    expense: []
  });
  const [incomePie, setIncomePie] = useState({ labels: [], values: [] });
  const [expensePie, setExpensePie] = useState({ labels: [], values: [] });

  useEffect(() => {
    const load = async () => {
      const res = await fetchTransactions();
      setTransactions(res.data.transactions);
    };
    load();
  }, []);

  // Section 1 — KPIs
  useEffect(() => {
    setMetrics(
      buildSummaryMetrics(
        transactions,
        kpiFilters.startDate,
        kpiFilters.endDate
      )
    );
  }, [transactions, kpiFilters]);

  // Section 2 — Bar chart
  useEffect(() => {
    setBarData(
      buildIncomeExpenseSeries(
        transactions,
        barFilters.startDate,
        barFilters.endDate
      )
    );
  }, [transactions, barFilters]);

  // Section 3 — Pie charts
  useEffect(() => {
    setIncomePie(
      buildCategorySeries(
        transactions,
        pieFilters.startDate,
        pieFilters.endDate,
        "income"
      )
    );

    setExpensePie(
      buildCategorySeries(
        transactions,
        pieFilters.startDate,
        pieFilters.endDate,
        "expense"
      )
    );
  }, [transactions, pieFilters]);

  return (
    <div className="space-y-12">
      {/* SECTION 1 — FINANCIAL OVERVIEW */}
      <Card className="p-6 space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-blue-700">
            Financial Overview
          </h2>
          <p className="text-sm text-slate-500">
            Summary of your income, expenses, and savings for the selected period.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">
            Date Range
          </p>
          <DateRangeFilter
            onChange={(key, value) =>
              setKpiFilters((prev) => ({ ...prev, [key]: value }))
            }
          />
        </div>

        <SummaryKpis metrics={metrics} />
      </Card>

      {/* SECTION 2 — INCOME VS EXPENSE ANALYSIS */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-blue-700">
            Income vs Expense Analysis
          </h2>
          <p className="text-sm text-slate-500">
            Compare how your earnings and spending evolve over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart */}
          <div className="lg:col-span-3">
            <IncomeExpenseChart
              categories={barData.categories}
              series={barData}
            />
          </div>

          {/* Filters */}
          <div className="lg:col-span-1">
            <p className="text-sm font-medium text-slate-600 mb-2">
              Date Range
            </p>
            <DateRangeFilter
              onChange={(key, value) =>
                setBarFilters((prev) => ({ ...prev, [key]: value }))
              }
            />
          </div>
        </div>
      </Card>

      {/* SECTION 3 — CATEGORY DISTRIBUTION */}
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-blue-700">
            Category Distribution
          </h2>
          <p className="text-sm text-slate-500">
            Understand where your income comes from and where your money goes.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">
            Date Range
          </p>
          <DateRangeFilter
            onChange={(key, value) =>
              setPieFilters((prev) => ({ ...prev, [key]: value }))
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3 text-blue-700">
              Income by Category
            </h3>
            <ExpenseCategoryChart
              labels={incomePie.labels}
              values={incomePie.values}
            />
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-pink-500">
              Expense by Category
            </h3>
            <ExpenseCategoryChart
              labels={expensePie.labels}
              values={expensePie.values}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
