"use client";
import React, { useState } from "react";
import { Grid, Typography, Avatar, Stack, IconButton } from "@mui/material";
import Map from "@/app/(components)/map/map";
import MapDetails from "@/app/(components)/map/mapDetails";
import { styled } from "@mui/system";
import IdCard from "../../../../../public/Img/id-card-solid.svg";
import Truck from "../../../../../public/Img/truck-moving-solid.svg";
import MapImg from "../../../../../public/Img/map.svg";
import Route from "../../../../../public/Img/route-solid.svg";
import Road from "../../../../../public/Img/road-solid.svg";
import Image from "next/image";
import AutoBox from "@/app/(components)/mui-components/Autocomplete/index";

const iconUrls = [
  {icon:"./truck1.svg",color:"blue"},
  {icon:"./truck2.svg",color:"red"},
 { icon:"./truck3.svg",color:"green"},
 {icon: "./truck4.svg",color:"gray"},
];
const coordinate = [
  { lat: "28.51079782059423", log: "77.40362813493975" },
  { lat: "28.510404514720925", log: "77.40712974097106" },
  { lat: "28.512297585971584", log: "77.40356012099012" },
  { lat: "28.510728275696316", log: "77.40199688895548" },
  { lat: "28.511107212816803", log: "77.4063730115565" },
  { lat: "28.512937158827324", log: "77.41783963937374" },
];
const buttonData = [
  { label: "Charging : 3",color:'red' },
  { label: "Swapping : 4", color: "green" },
  { label: "Scheduled CS : 3", color: "blue" },
  { label: "Scheduled SS : 6", color: "gray" },

];
const MainGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: "#6099EB",
  color: "#fff",
  borderRadius: "16px",
  padding: theme.spacing(1),
}));
function ShorterGrid() {
  const data = [
    {
      label: "Region",
      value: "All",
      icon: MapImg,
      data1: [
        { title: "Mumbai" },
        { title: "Delhi" },
        { title: "Agra" },
        { title: "Jaipur" },
        { title: "Kolkata" },
        { title: "Assam" },
      ],
    },
    {
      label: "Customer",
      value: 1250,
      icon: IdCard,
      data1: [
        { title: "customer1" },
        { title: "customer2" },
        { title: "customer3" },
        { title: "customer4" },
        { title: "customer5" },
        { title: "customer6" },
      ],
    },
    {
      label: "Fleet",
      value: 150,
      icon: Truck,
      data1: [
        { title: "fleet" },
        { title: "56" },
        { title: "63" },
        { title: "8" },
        { title: "9" },
        { title: "3" },
      ],
    },
    { label: "Consumption rate", value: "650 kWh/km", icon: Road },
    { label: "Total mileage accumulated", value: "11,121 km", icon: Route },
  ];

  const [activeMarker, setActiveMarker] = useState(null);
  const [icons, setIcons] = useState(null);

  const handleMapData = (index, point,color) => {
    console.log("point", index, point,color);
    setActiveMarker(index);
    setIcons(point);
  };
  const onClose = () => {
    setActiveMarker(null);
  };
  return (
    <Grid spacing={2} container>
      {data.map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={2.4} lg={2.4}>
          <MainGrid>
            <Grid container rowGap={2}>
              {index < 3 && (
                <AutoBox
                  icon={item?.icon}
                  place={item?.label}
                  data={item?.data1}
                />
              )}
              {index >= 3 && (
                <Grid container alignItems="center">
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
                </Grid>
              )}
              {index < 3 && (
                <Typography variant="h3" sx={{ pl: 7 }}>
                  {item?.value}
                </Typography>
              )}
              {index >= 3 && (
                <Typography
                  variant="h3"
                  sx={{
                    pl: { xs: 7, sm: 7, md: 1, lg: 3 },
                    mt: { sm: 1, md: 2, lg: 2 },
                  }}
                >
                  {item?.value}
                </Typography>
              )}
            </Grid>
          </MainGrid>
        </Grid>
      ))}
      {activeMarker && activeMarker !== null ? (
        <Grid item xl={9} xs={12}md={8} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      ) : (
        <Grid item xs={12} height={"380px"}>
          <Map
            handleMapData={handleMapData}
            iconUrls={iconUrls}
            activeMarker={activeMarker}
            setActiveMarker={setActiveMarker}
            buttonData={buttonData}
            coordinate={coordinate}
            onClose={onClose}
          />
        </Grid>
      )}
      {activeMarker && activeMarker !== null && (
        <Grid item xl={3}  xs={12} md={4} height={"380px"}>
          <MapDetails icons={icons} onClose={onClose}/>
        </Grid>
      )}
    </Grid>
  );
}
export default ShorterGrid;
