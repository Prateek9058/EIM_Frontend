"use client"
import { Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import Map from '@/app/(components)/map/map'
import { Card, Divider, Avatar } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Search from '@/components/Search/index'
import { CustomGrid } from '../../mui-components/CustomGrid';
import CustomTextField from "../../mui-components/Text-Field's";
import MapImg from "../../../../../public/Img/Vector.svg"
import Image from 'next/image';

const VehicleScheduling = () => {
    const data = [
        { title: 'Scheduled', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" },
        { title: 'Available', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W",queue:"queue 3" },
        { title: 'Scheduled', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" },
        { title: 'Available', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" }
    ];
    const InfoRow = ({ label, value }) => (
        <Grid container justifyContent="space-between" marginTop={2}>
            <Typography>{label}</Typography>
            <Typography>{value}</Typography>
        </Grid>
    );
    return (
        <Grid container xs={6} sm={12} xl={12} rowGap={2}>
            <Grid container height={"380px"} xl={12} >
                <Map />
            </Grid>
            <CustomGrid>
                <Grid item xs={8}>
                    <Typography variant='h4' padding={2}>CS/SS Scheduling Overview </Typography>
                </Grid>
                <Grid item xs={4} sx={{ mt: 1 }}>
                    <CustomTextField type={"search"} placeholder={"Search"} fullWidth />
                </Grid>
            </CustomGrid>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <Grid key={index} item xl={3} md={3} sm={12} xs={12}>
                        <Card sx={{ maxWidth: "auto", backgroundColor: '#6099EB', paddingTop: 3, borderRadius: "10px" }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image="./Img/card.svg"
                            />
                            <CardContent sx={{ backgroundColor: index%2===0?"#009660": "#0179BD"}}>
                                <Grid container justifyContent={"space-between"}>
                                    <Typography gutterBottom variant="h4" component="div">
                                       {item?.title} <br /><span style={{ fontSize: "12px" }}>CS/SS Staion ID {`(${item?.queue})`}</span>
                                    </Typography>
                                    <Avatar sx={{ borderRadius: "4px" }}><Image src={MapImg} alt="map" /></Avatar>
                                </Grid>
                                <Divider sx={{ border: "0.1px solid #fff" }} />
                                <Grid container direction="column">
                                    <InfoRow label="Tractor ID" value={item?.id} />
                                    <InfoRow label="Expected arrival time" value={item?.arrivalTime} />
                                    <InfoRow label="Expected charging time" value={item?.rate} />
                                    <InfoRow label="Charge rate" value={item?.charge} />
                                    <InfoRow label="Current SoC" value={item?.soc} />
                                </Grid>
                            </CardContent>
                            <CardActions sx={{ backgroundColor:index%2===0? "#02BB78": "#008CDB"}}>
                                <Typography variant="body2">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nisi porro, corrupti molestias accusamus quas maiores delectus libero vitae possimus.
                                </Typography>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
export default VehicleScheduling
