import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from "recharts";
import { CATEGORY_COLORS } from "../utils/chartColors";

const CategoryPieChart = ({ data }) => {
  return (
    <>
      <h3 className="font-semibold text-slate-900 mb-3">
        Expense by Category
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            innerRadius={50}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                }
              />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `₹${v}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default CategoryPieChart;


