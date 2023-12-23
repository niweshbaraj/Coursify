import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Data } from "../utils/Data.js";
import PieChart from "../components/PieChart.jsx";
import BarChart from "../components/BarChart.jsx";
import LineChart from "../components/LineChart.jsx";

import { Card } from 'flowbite-react';
// import "./styles.css";

Chart.register(CategoryScale);

function SystemSettings() {
  const { currentUser } = useSelector((state) => state.user);
  const [studentData, setStudentData] = useState({});
  // let c_id = null;
  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  const [selected, setSelected] = useState(null);

  const handleChange = (selectedOption) => {
    setSelected(selectedOption.target.value);
    console.log(`Option selected:`, selectedOption.target.value);
  };

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

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        // data : [studentData.n_foundation, studentData.n_diploma, studentData.n_degree, studentData.n_bs],
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
  
  return (
    <div className="flex justify-items-center gap-6 m-10">
      {/* <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select an option
      </label> */}
      <select
        id="graphs"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a graph</option>
        { options.length > 0 ?
          options.map((opt) => (
            <option key={opt.id} value={opt.value}>{opt.value}</option>
          )):
          ""
        }
      </select>

      <div>
        {selected === "blues" ? 
        <div className="items-center w-6/12 h-1/2 p-3 mt-5 mx-auto">
          <PieChart chartData={chartData} />
        </div>
        : selected === "rock" ?
        <div className="items-center w-6/12 h-1/2 p-3 mt-5 mx-auto">
          <BarChart chartData={chartData} />
        </div>
        : selected === "jazz" ?
        <div className="items-center w-6/12 h-1/2 p-3 mt-5 mx-auto">
          <LineChart chartData={chartData} />
        </div>
        : selected === "orchestra" ?
        <div className="items-center w-6/12 h-1/2 p-3 mt-5 mx-auto">
          <PieChart chartData={chartData} />
        </div>
        : <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">Please select the graphs from the options to show it here</h1>
      }
      </div>
      
    </div>
  );
}

export default SystemSettings;
