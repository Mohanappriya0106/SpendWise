import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const MonthlyBarChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h3 className="font-semibold mb-3">
        Monthly Income vs Expense
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" />
          <Bar dataKey="expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
