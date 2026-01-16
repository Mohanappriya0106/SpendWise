import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";

const MonthlyBarChart = ({ data }) => {
  return (
    <>
      <h3 className="font-semibold text-slate-900 mb-3">
        Monthly Income vs Expense
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip formatter={(v) => `₹${v}`} />
          <Legend />

          <Bar
            dataKey="income"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expense"
            fill="#f43f5e"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default MonthlyBarChart;


