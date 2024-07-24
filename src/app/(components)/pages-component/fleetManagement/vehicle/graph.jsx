import React from 'react'
import { Grid } from '@mui/material';
import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const data = {
    labels: ["1", "2", "3", "4", "5", "6", "7",],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40, 20, 36, 48, 16],
        backgroundColor: 'rgba(247, 187, 187, .2)', // Fill color for the area chart
        borderColor: '#C0FE72',
        borderWidth: 2,
        // pointHoverRadius:10
    }
    // },{
    //     label: 'My First Dataset1',
    //     data: [25, 59, 60, 81, 56, 52, 40, 60, 36, 48, 16],
    //     backgroundColor: 'rgba(56, 194, 227, 0.2)',
    //     borderColor: 'rgb(75, 192, 192)',
    //     borderWidth: 2,
    //     pointHoverRadius:10
    // }
    ]
};
const options = {
    // animations: {
    //     tension: {
    //       duration: 1000,
    //       easing: 'linear',
    //       from: 0.8,
    //       to: 0.5,
    //       loop: true
    //     }
        
    //   },
   
    scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: 'white', // Color of y-axis labels
          },
        },
        x: {
            beginAtZero: true,
          display: true,
          ticks: {
            color: 'white', // Color of x-axis labels
          },
        },
      },
    plugins: {
        legend: {
            display: true,
            position: "top",
            align: "end",
            margin:"20px",
            fullSize: true,
            labels: {
                pointStyle: 'circle',
                usePointStyle: true,
                textAlign: 'left',
                color:"#fff",
                margin:"20px"
            }
        },tooltip: {
            enabled: true// Hide tooltips
        }
    },
    interaction: {
        mode: 'index',
        intersect: false
      },
};
const config = {
    type: 'line',
    data: data,
    options: {
        ...options,
    },
   
};
const Graph = () => {
    return (
        <Grid container >
            <Grid container mt={4} mb={3}>
            <Line data={data} height={120}  options={config.options}/>
            </Grid>
  
        </Grid>
    ) 
}

export default Graph