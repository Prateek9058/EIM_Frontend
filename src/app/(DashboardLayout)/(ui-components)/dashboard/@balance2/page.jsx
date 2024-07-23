"use client"
import { Grid, Typography, Box } from "@mui/material"
import { Doughnut } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import styled from "@emotion/styled";
import Badge from '@mui/material/Badge';
import Image from "next/image";
import Station from '../../../../../../public/Img/Station.svg'

// import {CustomGrid} from '@/components/CustomGrid/index'
const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#6099EB',
  borderRadius: "16px",
  color: "#fff"
}))

Chart.register(...registerables);
const data1 = {
  labels: [
    'Red',
    'Blue',
    'Yellow',
    'orange'
  ],
  datasets: [{
    label: 'My First Datasetsss',
    data: [1895, 60, 120, 20],
    backgroundColor: [
      '#B7B597',
      '#DAD3BE',
      '#254336',
      '#6B8A7A'
    ],
    hoverOffset: 15,
    borderColor: 'transparent', 
    // hoverBackgroundColor: "red",
    // hoverBorderColor: "blue",
  }]
}
const options = {
  animations: {
    animateScale: true
  },
  maintainAspectRatio: false, // Allow the chart to fill the container
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      align: "center",
      fullSize: true,
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        textAlign: 'left',
        padding: 20,
        boxWidth: 10,
        generateLabels: function (chart) {
          const datasets = chart.data.datasets;
          const labels = chart.data.labels;
          return labels.map(function (_, index) {
            const backgroundColor = datasets.map(dataset => dataset.backgroundColor[index]);
            return {
              text: '',
              fillStyle: backgroundColor,
              hidden: !chart.isDatasetVisible(index),
              index: index,
              onClick: function (event, legendItem) {
                const isHidden = chart.getDatasetMeta(legendItem.datasetIndex).hidden;
                chart.getDatasetMeta(legendItem.datasetIndex).hidden = !isHidden;
                chart.update();
              }
            };
          });
        }
      }
    },
    tooltip: {
      enabled: true // Hide tooltips
    }
  },
  interaction: {
    mode: 'index',
    intersect: false
  },
};
const config = {
  type: 'line',
  data: data1,
  options: {
    ...options,
  }
};
const data = [
  { labels: "Offline CS/SS Station", value: "1895", color: "#B7B597" },
  { labels: "Online CS/SS Station", value: "60", color: '#DAD3BE' },
  { labels: "Occupied CS/SS Station", value: "120", color: '#254336' },
  { labels: "Available CS/SS Station", value: "20", color: '#6B8A7A' },
]
const Badge1 = styled(Badge)(({ color }) => ({
  marginRight: "16px",
"& .MuiBadge-badge": {
    backgroundColor: color,
    width: "12px", // Adjust size as needed
    height: "12px", // Adjust size as needed
    borderRadius: "50%", // Ensure it remains a circle
  }
}));

const BalancePage = () => {
  return (
    <Grid item md={4} xs={12}>
      <CustomGrid>
        <Grid container sx={{ height: "200px" }} justifyContent={"center"} alignItems={"center"}>
          <Doughnut data={data1} options={config.options} />
          <Box sx={{ padding: "0px 25px 0px 25px", borderRadius: "16px", background: "linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)" }}><Image src={Station} alt="Charging Station" /></Box>
        </Grid>
        <Grid container mt={20} mb={2}>
          <Grid container justifyContent={"space-between"}>
            <Typography variant="h6">All CS/SS Station</Typography>
            <Typography variant="h6">2000</Typography>
          </Grid>
          <List sx={{ width: '100%' }}>
            {data.map((text, item) => (
              <ListItem
                key={item}
                sx={{ padding: 0, rowGap: 2 }}
                disableGutters
                secondaryAction={
                  text.value
                }>
                <ListItemText sx={{ alignItems: "center" }}>
                  <Badge1 variant="dot" color={text.color} />{text.labels}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </CustomGrid>
    </Grid>
  )
}
export default BalancePage

