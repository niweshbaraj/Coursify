// components/BarChart.js
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line react/prop-types
function BarChart({ chartData }) {
  console.log(chartData);
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}

export default BarChart;