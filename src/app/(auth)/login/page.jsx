"use client";
import React from "react";
import { Grid, Box, Card, Stack, Typography, IconButton } from "@mui/material";
import PageContainer from "@/app/(components)/container/PageContainer";
import AuthLogin from "@/app/(components)/authentication/AuthLogin";
import TruckImg from "../../../../public/Img/Mask.png";
import logo from "../../../../public/Img/logo.svg";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <PageContainer title={"Login"} description={"this is login page"}>
        <Grid container sx={{ color: "#fff",  }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              height: "100vh",
              background:
                "linear-gradient(127.07deg, #589CFF -26.97%, #013376 71.52%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: { xs: 3, md: 6 },
            }}
          >
            <Stack rowGap={2}>
              <Stack rowGap={1}>
                <Typography variant="h2" color={"secondary"}>
                  Log In
                </Typography>
                <Typography>
                  Please Login In to continue to your Account
                </Typography>
              </Stack>
              <Stack />
              <AuthLogin
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  ></Stack>
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={12}
            md={6} sx={{ position: "relative" ,height: "100vh"}}>
            <Image src={TruckImg} alt="Truck" layout="fill" />
            <Grid
              sx={{
                position: "absolute",
                bottom: { xs: 10, md: 20 }, // Adjust as needed for responsiveness
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: "80%", sm: "60%", md: "40%" }, // Responsive width
                background:
                  "linear-gradient(127.07deg, #589CFF -26.97%, #013376 71.52%)",
                borderRadius: "8px",
                padding: "16px", // Responsive padding
              }}
            >
              <Image src={logo} alt="Logo" layout="responsive" height={60} />
            </Grid>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default Login;
