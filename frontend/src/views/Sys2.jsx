import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
// import { Data } from "../utils/Data.js";
import PieChart from "../components/PieChart.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);
const Sys2 = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [studentData, setStudentData] = useState({});
    const [pieChartData, setPieChartData] = useState({
        labels: ["R.K.A.", "ACTIVE"], 
        datasets: [
          {
            label: "Student Status ",
            data: [3, 16],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

      const [barChartData, setBarChartData] = useState({
        labels: ["FOUNDATION", "DIPLOMA", "DEGREE", "BS"], 
        datasets: [
          {
            label: "Course Level ",
            data: [8, 6, 3, 2],
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2
          }
        ]
      });

      useEffect(() => {
        let isCancelled = false;
    
        const fetchData = async () => {
          try {
            const res = await fetch("/api/admin/students-graph-data", {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
                contentType: "application/json",
              },
            });
            const studentsData = await res.json();
    
            if (!isCancelled) {
              if (!res.ok) {
                console.log(studentsData);
                return;
              }
              setStudentData(studentsData);
              console.log(studentData);
            }
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
    
        return () => {
          isCancelled = true;
        };
      }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
    <div className="col-span-1">
      <div className="mb-4 mt-5 ml-7">
        <PieChart chartData={pieChartData} />
      </div>
    </div>
    <div className="col-span-1">
      <div className="mb-4 mt-10 mr-7">
        <Bar data={barChartData} />
      </div>
    </div>
    {/* Add two more charts here in the same manner */}
  </div>
  )
}

export default Sys2