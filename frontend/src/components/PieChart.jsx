// src/components/PieChart.js
import { Pie } from "react-chartjs-2";

// eslint-disable-next-line react/prop-types
function PieChart({ chartData }) {
  console.log(chartData)
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Student Status</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Number of Active and Inactive Students"
            }
          }
        }}
      />
    </div>
  );
}


export default PieChart;