'use client'
import React, { useState } from 'react';
import { Grid, Typography, Avatar } from '@mui/material';
import Map from '@/app/(components)/map/map'
import { styled } from '@mui/system';
import IdCard from "../../../../../public/Img/id-card-solid.svg"
import Truck from "../../../../../public/Img/truck-moving-solid.svg"
import MapImg from "../../../../../public/Img/map.svg"
import Route from "../../../../../public/Img/route-solid.svg"
import Road from "../../../../../public/Img/road-solid.svg"
import Image from 'next/image';
import AutoBox from '@/app/(components)/mui-components/Autocomplete/index'

const MainGrid = styled(Grid)(({ theme }) => ({
    backgroundColor: '#6099EB',
    color: "#fff",
    borderRadius: "16px",
    padding: theme.spacing(1)
}))
function ShorterGrid() {
    const data = [
        { label: "Region", value: "All", icon: MapImg },
        { label: "Customer", value: 1250, icon: IdCard },
        { label: "Fleet", value: 150, icon: Truck },
        { label: "Comsumption Rate", value: "650 kWh/km", icon: Road },
        { label: "Total mileage accumulated", value: "60 km", icon: Route, },
    ];
    const iconUrls = [
        '/truck1.svg',
        '/truck2.svg',
        '/truck3.svg',
        '/truck4.svg',
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
        { label: 'All Vehicle', },
        { label: 'Offline', color: "green" },
        { label: 'Online', color: "blue" },
        { label: 'In Charging', color: "yellow" },
        { label: 'In Trip', color: "gray" },
        { label: 'Breakdown', color: "gray" },
    ];
    return (
        <Grid spacing={2} container >
            {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={2.4} lg={2.4}>
                    <MainGrid >
                        <Grid container rowGap={2}>
                            {index < 3 && <AutoBox icon={item?.icon} place={item?.label} />}
                            {index >= 3 && (<Grid container alignItems="center">
                                <Grid item xs={2}>
                                    <Avatar
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: "rgba(193, 255, 114, 0.13)",
                                        }}
                                    >
                                        {item.icon && <Image src={item.icon} alt={item.label} />}
                                    </Avatar>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="h6" sx={{ pl: 2 }}>
                                        {item?.label}
                                    </Typography>
                                </Grid>
                            </Grid>)
                            }
                            {index === 3 && <Typography variant='h3' sx={{
                                pl: {
                                    sm: 4,
                                    md: 0,
                                    lg:6
                                },
                            }}>{item?.value}</Typography>}
                            {index != 3 && <Typography variant='h3' sx={{ pl: 7 }}>{item?.value}</Typography>
                            }                        </Grid>
                    </MainGrid>
                </Grid>
            ))}
            <Grid item xs={12} height={"380px"} >
                <Map iconUrls={iconUrls} buttonData={buttonData} coordinate={coordinate} />
            </Grid>
        </Grid>
    );
}
export default ShorterGrid;
