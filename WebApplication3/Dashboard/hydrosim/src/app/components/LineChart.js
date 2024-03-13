import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData, header }) {

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display:true,
          text:'Time (minutes)'
        }
      },
      y: {
        title: {
          display:true,
          text: 'Runoff (m\u00B3/s)'
        },
        min: 0,
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Simulated hydrograph based on the current catchment and storm',
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}> {header}</h2>
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
}
export { LineChart as default };