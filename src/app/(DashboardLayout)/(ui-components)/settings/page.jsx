"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, TextField, Typography } from "@mui/material";
import Image from "next/image";
import ProfilePic from "../../../../../public/Img/profilepic.svg";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Settings", link: "/settings" },
];
const Settings = () => {
  const router = useRouter();
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;
  const [data,setData]=useState(null)
  const handleClick = () => {
    router.push("/settings/edit");
    console.log("khgj.dfg")

  };
  const onSubmit = async() => {
    try {
      const res=await axiosInstance.get('/auth/myProfile')
      if(res?.status === 200 || res?.status === 201){
        console.log("res",res)
        setData(res?.data?.data)
       }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=>{
    onSubmit()
  },[])
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
                  Change Password
                </Button>
              </Grid>
            </Grid>
            <Grid container rowGap={4} pl={2} mt={4} mb={2}>
              <Grid item xs={5}>
                <Typography>Username</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter name" fullWidth disabled defaultValue={data?.userName}/>
              </Grid>
              <Grid item xs={5}>
                <Typography>Phone number</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter Phone number" fullWidth disabled defaultValue={data?.mobileNumber} />
              </Grid>
              <Grid item xs={5}>
                <Typography>Email address</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter email address" fullWidth disabled defaultValue={data?.emailId}/>
              </Grid>
              <Grid item xs={5}>
                <Typography>address</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter address" fullWidth disabled defaultValue={data?.address}/>
              </Grid>
              <Grid item xs={5}>
                <Typography>Role</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter Role" fullWidth disabled defaultValue={data?.role}/>
              </Grid>
              <Grid item xs={5}>
                <Typography>Level</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField placeholder="Enter level" fullWidth disabled defaultValue={data?.level}/>
              </Grid>
             
            </Grid>
          </CustomGrid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Settings;
