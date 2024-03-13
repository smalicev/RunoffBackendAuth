import React from "react";
import { Pie } from "react-chartjs-2";


function PieChart({ chartData, header }) {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Volumetric Runoff (m\u00B3)',
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}> {header}</h2>
      <Pie
        data={chartData}
        options={options}
      />
    </div>
  );
}
export { PieChart as default };