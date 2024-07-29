"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import ProfilePic from "../../../../../public/Img/profilepic.svg";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Settings", link: "/settings" },
];
const Settings = () => {
  const router = useRouter();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const handleClick = () => {
    router.push("/settings/edit");
    console.log("khgj.dfg")

  };
  const onSubmit = () => {
    console.log("sdljgjakjh");
  };
  return (
    <Grid container rowGap={2} position={"relative"}>
      <ManagementGrid
        moduleName={"Settings"}
        breadcrumbItems={breadcrumbItems}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <CustomGrid>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Avatar sx={{ height: "120px", width: "120px" }}>
                  <Image src={ProfilePic} />
                </Avatar>
              </Grid>
              <Grid item>
                <Button variant="contained" size="large" onClick={handleClick}>
                  Edit
                </Button>
              </Grid>
            </Grid>
            <Grid container rowGap={4} pl={2} mt={4} mb={2}>
              <Grid item xs={5}>
                <Typography>Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter name" fullWidth />
              </Grid>
              <Grid item xs={5}>
                <Typography>Phone number</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter Phone number" fullWidth />
              </Grid>
              <Grid item xs={5}>
                <Typography>Email address</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter email address" fullWidth />
              </Grid>
              <Grid item xs={5}>
                <Typography>Password</Typography>
              </Grid>
              <Grid item xs={3} direction={"column"}>
                <TextField
                  placeholder={"Enter password"}
                  fullWidth
                  type={"password"}
                />
              </Grid>
            </Grid>
          </CustomGrid>
          <Grid
            container
            justifyContent={"flex-end"}
            columnGap={2}
            mr={2}
            mt={2}
          >
            <Button variant="outlined" size="large">
              Back{" "}
            </Button>
            <Button variant="contained" size="large" type="submit">
              Submit{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Settings;
