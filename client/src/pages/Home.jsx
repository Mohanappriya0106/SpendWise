import { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";
import { getCurrentMonthSummary } from "../utils/monthlySummary";
import { useAuth } from "../context/AuthContext";
import KpiCard from "../components/ui/KpiCard";
import { MARKET_PRICES } from "../constants/marketPrice";

const Home = () => {
  const { user } = useAuth();

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    net: 0
  });

  useEffect(() => {
    const load = async () => {
      const res = await fetchTransactions();
      const data = getCurrentMonthSummary(res.data.transactions);
      setSummary(data);
    };

    load();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here’s a quick overview of your finances this month.
        </p>
      </div>

      {/* Income & Expense */}
      <div>
        <h2 className="text-sm font-medium text-slate-500 mb-3">
          This Month
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <KpiCard
            label="Income"
            value={summary.income}
            accent="green"
          />
          <KpiCard
            label="Expense"
            value={summary.expense}
            accent="red"
          />
        </div>
      </div>

      {/* Savings & Budget */}
      <div>
        <h2 className="text-sm font-medium text-slate-500 mb-3">
          Savings Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <KpiCard
            label="Net Savings"
            value={summary.net}
            accent={summary.net >= 0 ? "green" : "red"}
          />
          <KpiCard
            label="Budget Status"
            value={summary.net}
            accent="indigo"
          />
        </div>
      </div>

      {/* Market Insight */}
      <div>
        <h2 className="text-sm font-medium text-slate-500 mb-2">
          Market Insight
        </h2>
        <p className="text-sm text-slate-600 mb-4 max-w-2xl">
          Gold and silver prices have shown a steady upward trend over time,
          making them attractive options for long-term investment and wealth
          preservation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <KpiCard
            label="Gold Price (₹/g)"
            value={MARKET_PRICES.gold}
          />
          <KpiCard
            label="Silver Price (₹/g)"
            value={MARKET_PRICES.silver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

