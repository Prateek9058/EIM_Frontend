"use client";
import {
  Grid,
  IconButton,
  Box,
  Badge,
  Typography,
  ButtonGroup,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  InfoBox,
} from "@react-google-maps/api";
import axios from "axios";
import styled from "@emotion/styled";

const center = {
  lat: 28.5355161,
  lng: 77.3910265,
};
const Page = ({
  iconUrls,
  buttonData,
  Height,
  coordinate,
  activeMarker,
  setActiveMarker,
  onClose,
  handleMapData,
}) => {
  const containerStyle = {
    width: "100%",
    borderRadius: "16px",
    height: Height ? Height : "364px",
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y",
  });
  const [snap, setSnap] = useState([]);

  const fetchData = async () => {
    try {
      const path = coordinate
        .map((coord) => `${coord.lat},${coord.log}`)
        .join("|");
      const response = await axios.get(
        `https://roads.googleapis.com/v1/snapToRoads?path=${path}&key=AIzaSyBrsCdS1KEJ9QDOgnl5gwnemCuLJDKzp9Y`
      );
      const datasnap = response.data.snappedPoints;
      if (datasnap) {
        setSnap(datasnap);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [activeButton, setActiveButton] = useState(null);
  const [filteredMarkers, setFilteredMarkers] = useState(null);
  useEffect(() => {
    if (activeButton !== null) {
      const filtered = snap.filter((point, index) => {
        const color1 = iconUrls[index % iconUrls.length].color;
        console.log("k.fgkjdsan.gk",iconUrls[index % iconUrls.length].color)
        return color1 === buttonData[activeButton].color;
     
      });

      setFilteredMarkers(filtered);
    } else {
      setFilteredMarkers(snap);
    }
  }, [activeButton, snap]);
  const handleButtonClick = (buttonData,label) => {
    console.log(buttonData,label)
    setActiveButton(label);
    setActiveMarker(null);
  };

  const Badge1 = styled(Badge)(({ color }) => ({
    marginRight: "16px",
    "& .MuiBadge-badge": {
      backgroundColor: color,
    },
  }));
  console.log("esjghslk", activeMarker);
  return (
    <Grid container rowGap={2} xs={12} sx={{ borderRadius: "16px" }}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          // onLoad={() => {
          //   snap.forEach((point, index) => {
          //     setTimeout(() => {
          //       setActiveMarker(index);
          //     }, index * 2000);
          //   });
          // }}
          onUnmount={() => {
            setActiveMarker(null);
          }}
        >
          <div>
            {filteredMarkers &&
              filteredMarkers.map((point, index) => {
                const icon = iconUrls[index % iconUrls.length].icon;
                const color = buttonData[index % iconUrls.length].color;
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: point.location.latitude,
                      lng: point.location.longitude,
                    }}
                    onClick={() => handleMapData(index, icon,color)}
                    icon={{
                      url: iconUrls && iconUrls[index % iconUrls.length].icon,
                      anchor: new google.maps.Point(17, 46),
                      scaledSize: new google.maps.Size(80, 80),
                    }}
                  >
                    {activeMarker === index && (
                      <InfoWindow onCloseClick={onClose}>
                        <Box
                          sx={{
                            padding: 2,
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Grid
                            container
                            spacing={2}
                            direction="column"
                            sx={{ color: "#000" }}
                          >
                            <Grid item>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ fontWeight: "bold" }}
                              >
                                Payload
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography variant="body1" component="div">
                                20 Ton
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </InfoWindow>
                    )}
                  </Marker>
                );
              })}
            <Grid container xs={12} sx={{ position: "relative" }}>
              {buttonData && (
                <Grid
                  container
                  sx={{
                    padding: "8px",
                    position: "absolute",
                    backgroundColor: "#161861",
                    top: 315,
                    transform: "translateX(-50%)",
                    left: "50%",
                  }}
                >
                  <Box
                    sx={{
                      left: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      mb: 0,
                    }}
                  >
                    {buttonData && (
                      <ButtonGroup aria-label="Basic button group">
                        {buttonData.map((button, index) => (
                          <Button
                            variant="outlined"
                            key={index}
                            sx={{
                              ".MuiButton-outlined": {
                                border: "1px solid #fff",
                                color: "#fff",
                              },
                              "&:hover": {
                                border: "1px solid #C0FE72",
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                                color: "#C0FE72",
                              },
                            }}
                            startIcon={
                              <Badge1
                                variant="dot"
                                color={
                                  activeButton === index
                                    ? "black"
                                    : button.color
                                }
                              />
                            }
                            onClick={() => handleButtonClick(index,button.color)}
                          >
                            {button.label}
                          </Button>
                        ))}
                      </ButtonGroup>
                    )}
                  </Box>
                </Grid>
              )}
            </Grid>
          </div>
        </GoogleMap>
      )}
    </Grid>
  );
};
export default Page;
