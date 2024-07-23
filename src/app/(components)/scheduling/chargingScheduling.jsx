"use client"
import { Grid, IconButton, Badge, Paper, InputBase, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
// import Tabs from '@/components/tabs/index'
import SearchIcon from "@mui/icons-material/Search";
import { Card, Divider ,Avatar} from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import MapImg from "../../../../public/Img/Vector.svg"
import CardMedia from '@mui/material/CardMedia';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, InfoBox, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import styled from "@emotion/styled";
import Image  from 'next/image';
import { CustomGrid } from '../mui-components/CustomGrid';
import CustomTextField from '../mui-components/Text-Field\'s';
// import Search from '@/components/Search/index'

const center = {
    lat: 28.5355161,
    lng: 77.3910265
};
const ChargingScheduling = () => {
    const containerStyle = {
        width: '100%',
        height: "364px",
        border: "1px solid black",
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE"
    })
    const [snap, setSnap] = useState([]);
    const apiKey = 'AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE';
    const origin = " 28.51079782059423,77.40362813493975"
    const destination = '28.510404514720925,77.40712974097106';
    const waypoints = '-37.81223,144.96254|-34.92788,138.60008';
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=28.51079782059423,77.40362813493975&destination=28.510404514720925,77.40712974097106&key="AIzaSyBoq0tt73i_mEUB4gsGN8_ClQpD9d9RqFE"`)
            const datasnap = response.data;
            // console.log(response)
            if (datasnap) {
                setSnap(datasnap);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const [directions, setDirections] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (index) => {
        setActiveButton(index);
        setActiveMarker(index);
    };
    const [activeMarker, setActiveMarker] = useState(null);
    const onClose = () => {
        setActiveMarker(null)
    }
    const Badge1 = styled(Badge)(({ color }) => ({
        marginRight: "16px",
        "& .MuiBadge-badge": {
            backgroundColor: color,
        }
    }));
    const data = [
        { title: 'Scheduled', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" },
        { title: 'Charging', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" },
        { title: 'Swapping', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" },
        { title: 'Charging', id: "GHVCD12", arrivalTime: "35 Min", soc: "78%", rate: "2 hrs", charge: "2185W" }
    ];
    const InfoRow = ({ label, value }) => (
        <Grid container justifyContent="space-between" marginTop={2}>
            <Typography>{label}</Typography>
            <Typography>{value}</Typography>
        </Grid>
    );
    return (
        <Grid container xs={6} sm={12} xl={12} rowGap={2}>
            <Grid item xs={12}>
                <Grid container height={"380px"} xl={12} >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onLoad={map => {
                            const directionsService = new google.maps.DirectionsService();
                            directionsService.route(
                                {
                                    origin: { lat: 28.51079782059423, lng: 77.40362813493975 }, // Example origin
                                    destination: { lat: 28.510404514720925, lng: 77.40712974097106 }, // Example destination
                                    travelMode: google.maps.TravelMode.DRIVING
                                },
                                (result, status) => {
                                    if (status === google.maps.DirectionsStatus.OK) {
                                        setDirections(result); // Save directions to state
                                    } else {
                                        console.error(`Directions service failed due to ${status}`);
                                    }
                                }
                            );
                        }}
                    >
                        {directions && (
                            <DirectionsRenderer
                                directions={directions}
                                options={{
                                    polylineOptions: {
                                        strokeColor: '#000' // Customize polyline color
                                    }
                                }}
                            />
                        )}
                    </GoogleMap>
                </Grid>
            </Grid>
            <CustomGrid>
                <Grid item xs={8}>
                    <Typography variant='h4' padding={2}>E-Tractor Scheduling Overview </Typography>
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
                                        Scheduled <br /><span style={{ fontSize: "12px" }}>CS/SS Staion ID</span>
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
export default ChargingScheduling