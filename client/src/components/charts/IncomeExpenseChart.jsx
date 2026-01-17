import Chart from "react-apexcharts";

const IncomeExpenseChart = ({ series, categories }) => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%"
      }
    },
    colors: ["#10b981", "#f43f5e"],
    dataLabels: { enabled: false },
    xaxis: {
      categories
    },
    legend: {
      position: "top"
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`
      }
    }
  };

  return (
    <Chart
      options={options}
      series={[
        { name: "Income", data: series.income },
        { name: "Expense", data: series.expense }
      ]}
      height={350}
    />
  );
};

export default IncomeExpenseChart;
