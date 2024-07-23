"use client"
import { Button, Grid, Typography, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Graph from '@/app/(components)/fleetManagement/vehicle/graph'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Map from '@/app/(components)/map/map'
import Chip from '@mui/material/Chip';
import DistanceTravel from '../ViewReport/DistanceTravel';
import { useRouter } from 'next/navigation';
import { CustomDropdown } from '../../mui-components/DropdownButton/index';
import { Fleet } from '../../table/rows';
import styled from "@emotion/styled";
import Table from "./table"
import LinearProgress from '@mui/material/LinearProgress';


const CustomGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#6099EB',
    borderRadius: "16px",
    color: "#fff"
}))
const iconUrls = [
    { icon: '/truck1.svg', color: "blue" },
    { icon: '/truck2.svg', color: "red" },
    { icon: '/truck3.svg', color: "green" },
    { icon: '/truck4.svg', color: "skyblue" },
];
const coordinate = [
    { lat: "28.51079782059423", log: "77.40362813493975" },
    { lat: "28.510404514720925", log: "77.40712974097106" },
    { lat: "28.512297585971584", log: "77.40356012099012" },
    { lat: "28.510728275696316", log: "77.40199688895548" },
    { lat: "28.511107212816803", log: "77.4063730115565" },
    { lat: "28.512937158827324", log: "77.41783963937374" },
]
const buttonData = [
    { label: 'Offline', color: "red" },
    { label: 'Charging', color: "green" },
    { label: 'Trip', color: "blue" },
    { label: 'Parked', color: "skyblue" },
];
const Overview = ({ value }) => {
    const [distance, setDistance] = React.useState(false);
    const [payload, setPayload] = React.useState(false);
    const [trips, setTrips] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [deviceData, setDeviceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState(null);
    const [data, setData] = useState(null);
    const [data2, setData2] = useState(null);
    const [progress, setProgress] = React.useState(0);

    const handleDistance = () => {
        setDistance(true);
    };
    const handlePayload = () => {
        setPayload(true);
    };
    const handleTrips = () => {
        setTrips(true);
    };
    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    useEffect(() => {
        setData(Fleet)
        setData2(Fleet)
    }, [])
    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const data1 = [
        { content: '20 ', value: "E-tractor", title: "Distance Travelled (Km)", label: "View report", data: "Distance Travelled", handleFunction: handleDistance },
        { content: '20 ', value: "Vehicle", title: "Trip Payload (Ton)", label: "View report", data: "Trip Payload", handleFunction: handlePayload },
        { content: '20 ', value: "Vehicle", title: "Trips (Units Consumed)", label: "View report", data: "Trips", handleFunction: handleTrips }
    ];
    const router = useRouter();
    const days = ["Today", "Weekly", "Yearly"]
    const region = ["mumbai", "Delhi", "Agra", "banaras", "kolkata"]
    const [selectedItem, setSelectedItem] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open1 = Boolean(anchorEl);
    const handleClose = () => {
      setAnchorEl(null);
  }
    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        handleClose();
    };
    return (
        <Grid container spacing={2}>
            <DistanceTravel open={distance} setOpen={setDistance} data1="Distance Travelled (Km)" data={data2}/>
            <DistanceTravel open={payload} setOpen={setPayload} data1="Trip Payload" />
            <DistanceTravel open={trips} setOpen={setTrips} data1="Trips" />
            {data1.map((item, index) => (
                <Grid key={index} item xl={4} md={4} sm={12} xs={12}>
                    <CustomGrid>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant='h6'><TimerIcon sx={{ verticalAlign: 'middle', p: "3px" }} /> {item.title}</Typography>
                            <CustomDropdown  variant='contained' size='small' buttonname="Daily" menuItems={days} />
                        </Grid>
                        <Typography variant='h4' color={"rgba(30, 30, 100, 1)"}>{item.content} <span style={{ fontSize: "15px", fontWeight: 600 }}>E-Tractor</span> <Chip
                            label="16.8 %"
                            variant="filled"
                            size='small'
                            icon={<ArrowOutwardIcon color="#C0FE72" />}
                            sx={{ borderRadius: "4px", ml: 1, backgroundColor: "#23262966", color: "#C0FE72", border: "0.6px solid #232629" }} /></Typography>
                        <Graph />
                        <LinearProgress variant="determinate" value={progress} sx={{ border: "0.6px" }} />
                        <List>
                            <ListItem
                                disableGutters
                                key={index}
                                secondaryAction={
                                    <Button variant="text" onClick={item.handleFunction}>{item.label}</Button>}>
                                <ListItemText primary={item.data} />
                            </ListItem>
                        </List>
                    </CustomGrid>
                </Grid>
            ))}
            <Grid item xs={12} height={"380px"}>
                <Map iconUrls={iconUrls} buttonData={buttonData} coordinate={coordinate} />
            </Grid>
            <Grid item xs={12}>
                <Table
                    data={data}
                    value={value}
                    deviceData={deviceData}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    loading={loading}
                    getDataFromChildHandler={getDataFromChildHandler}
                />
            </Grid>
        </Grid>
    )
}

export default Overview

