import React from "react";
import { Line } from "react-chartjs-2";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
function LineChart({ chartData, header, XLabel, YLabel, Context }) {
    const theme = useTheme();
    

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        
        datasets: {
            line: {
                backgroundColor: theme.palette.secondary.main,
                borderColor: theme.palette.secondary.main
            },
        },
        elements: {
                line: {
                backgroundColor: theme.palette.secondary.main,
                },
        },
    scales: {
        x: {
            ticks: {

                color: 'black'
            },
            grid: {
                color: 'rgba(0,0,0,0.4)',
            },
        title: {
          display:true,
          text: XLabel,
            color: 'black',
        }
      },
        y: {
            ticks: {

                color: 'black'
            },
            grid: {
                color: 'rgba(0,0,0,0.4)',
            },
            color: 'rgba(255,255,255,0.3)',
        title: {
          display:true,
              text: YLabel,
            color: 'black',
        },
        min: 0,
      }
    },
    plugins: {
      legend: {
            position: 'top',
            labels: {
                color: 'black',
            }
      },
      title: {
        display: true,
          text: Context,
          color: 'black',
      },
    },
  };

    return (
      <>
            <Box style={{ width:'100%', alignItems:'center', justifyContent: 'center', display:'flex', columnGap:'1rem'}}> {header}</Box>
      
            <Box minHeight='24rem' bgcolor={theme.palette.primary.light} sx={{ padding: '1rem', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px', borderRadius:'2rem'} }>
          <Line
            data={chartData}
            options={options}
          />
        </Box>
    </>
  );
}
export { LineChart as default };