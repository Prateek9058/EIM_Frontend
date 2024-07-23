"use client"
import { Grid, Divider, Typography, } from '@mui/material'
import React from 'react'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Map from '@/app/(components)/map/map'
import { CustomGrid } from '../../mui-components/CustomGrid';
import { PiCarBatteryBold } from "react-icons/pi";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's/index";

const cardsData = [
    {
        onlineStatus: "Online",
        swappingStation: "Swapping station",
        ssIdentity: "SS Identity",
        batteryStatus: ["#C0FE72", "#C0FE72", "#C0FE72", "#FE7272"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
        distance: "2 Km",
        queueCharging: "3 Queue in charging",
        queueSwapping: "3 Queue in swapping"
    },
    {
        onlineStatus: "Offline",
        swappingStation: "Charging station",
        ssIdentity: "CS Identity (Technical Issue)",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
        distance: "5 Km",
        queueCharging: "2 Queue in charging",
        queueSwapping: "4 Queue in swapping"
    },
    {
        onlineStatus: "Offline",
        swappingStation: "Swapping station",
        ssIdentity: "SS Identity (No Energy)",
        batteryStatus: ["#C0FE72", "#FE7272", "#FE7272", "#FE7272"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore laborum",
        distance: "1 Km",
        queueCharging: "1 Queue in charging",
        queueSwapping: "2 Queue in swapping"
    }
];
const Overview = () => {
    const MapHeight = "630px"
    const iconUrls = [
        '/station.svg'
    ]
    return (
        <Grid container >
            <CustomGrid>
                <Grid item xs={12} md={6} p={2}>
                    <CustomTextField fullWidth type="search" placeholder="Search" />
                    <Divider />
                    {cardsData?.map((card, index) => (
                        <Grid item xs={12} key={index} >
                            <Card sx={{ backgroundColor: "transparent" }}>
                                <CardContent sx={{ padding: "5px", paddingBottom: "5px" }}>
                                    <Grid container justifyContent="space-between" mb={1}>
                                        <Typography sx={{ color: card.onlineStatus === "Online" ? "#1CD28E" : "#FE7272" }}>{card.onlineStatus}</Typography>
                                        <Typography sx={{ color: "#1E1E65", fontWeight: 650 }}>{card.swappingStation}</Typography>
                                    </Grid>
                                    <Grid container justifyContent="space-between" sx={{ padding: "0 26px" }} mb={2}>
                                        <Typography variant='h6'>{card.ssIdentity}</Typography>
                                        <Grid item sx={{ mr: 5 }}>
                                            {card?.batteryStatus && <Box display="flex" gap={2}>
                                                {card.batteryStatus.map((color, i) => (
                                                    <PiCarBatteryBold key={i} size="25px" color={color} />
                                                ))}
                                            </Box>}
                                        </Grid>
                                    </Grid>
                                    <Grid container sx={{ padding: "0 26px" }} rowGap={2}>
                                        <Grid item xs={2}>
                                            <RoomOutlinedIcon />
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography>{card.description}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography>{card.distance}</Typography>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography sx={{ color: "#C0FE72" }}>{card.queueCharging}</Typography>
                                            <Typography sx={{ color: "#C0FE72" }}>{card.queueSwapping}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <Divider />
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xl={6} md={6} xs={12}>
                    <Map iconUrls={iconUrls} Height={MapHeight} />
                </Grid>
            </CustomGrid>
        </Grid>
    )
}
export default Overview