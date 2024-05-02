import React from "react";
import { Line } from "react-chartjs-2";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
function LineChart({ chartData, header, XLabel, YLabel, Context }) {
    const theme = useTheme();
    

    const options = {
        maintainAspectRatio: false,
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
      <>
        <h2 style={{ textAlign: "center" }}> {header}</h2>
      
        <Box minHeight='4rem' color='primary.light'>
          <Line
            data={chartData}
            options={options}
          />
        </Box>
    </>
  );
}
export { LineChart as default };