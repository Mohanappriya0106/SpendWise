import Chart from "react-apexcharts";

const ExpenseCategoryChart = ({ labels, values }) => {
  const options = {
    labels,
    legend: { position: "bottom" },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`
      }
    }
  };

  return (
    <Chart
      options={options}
      series={values}
      type="donut"
      height={350}
    />
  );
};

export default ExpenseCategoryChart;
