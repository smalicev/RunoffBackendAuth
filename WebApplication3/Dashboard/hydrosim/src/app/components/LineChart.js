import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData, header, XLabel, YLabel, Context }) {

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display:true,
          text: XLabel,
        }
      },
      y: {
        title: {
          display:true,
              text: YLabel
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
          text: Context,
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