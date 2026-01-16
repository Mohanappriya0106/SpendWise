import KpiCard from "./ui/KpiCard";

const SummaryKpis = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <KpiCard label="Total Income" value={metrics.income} accent="green" />
      <KpiCard label="Total Expense" value={metrics.expense} accent="red" />
      <KpiCard
        label="Net Savings"
        value={metrics.net}
        accent={metrics.net >= 0 ? "green" : "red"}
      />
    </div>
  );
};

export default SummaryKpis;
