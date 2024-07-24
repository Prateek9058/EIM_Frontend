"use client"
import { Button, Grid, Typography, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Overview from '@/app/(components)/pages-component/fleetManagement/overView/Overview';
import Charging from '@/app/(components)/pages-component/fleetManagement/charging/charging';
import Trip from '@/app/(components)/pages-component/fleetManagement/Trip';
import ManagementGrid from '@/app/(components)/mui-components/Card';
import AddTractor from '@/app/(components)/pages-component/fleetManagement/addTractor'
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from '@/app/api/axiosInstance';

const Page = () => {
  const [value, setValue] = useState(0); // Initial active tab index
  const [customer,setCustomer]=useState(null)
  const [open, setOpen] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab index
  };
  const handleCustomer =async()=>{
    try {
      const response= await axiosInstance.get('/fleet/getCustomers')
      setCustomer(response?.data?.data)
      console.log("customer",response)
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    handleCustomer()
  },[])
  const tabs = [
    { label: `Overview (512)`, },
    { label: "Charging (235)",},
    { label: "Trip (56)", },
    { label: "E-Tractor Report", },
  ];
  const TabPanelList = [
    { component: <Overview value={"1"} /> },
    { component: <Charging value={"2"} /> },
    { component: <Trip value={"3"} /> },
    { component: <Trip value={"3"} /> },
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Fleet-Management", link: "/fleetManagement",},
  ];
  const droDownButtons = [
    { label: "Region", menuItems: ["Daily", "Weekly", "Yearly"] },
    { label: "Customer", menuItems: ["Customer 1", "Customer 2", "Customer 3"] }
  ]
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <Grid container xs={6} sm={12} xl={12} >
      <AddTractor open={open} setOpen={setOpen} />
      <ManagementGrid moduleName={"Fleet Management"} breadcrumbItems={breadcrumbItems} dropDown={droDownButtons} button={"Add E-Tractor"} handleClickOpen={handleOpen} tabs={tabs} value={value} handleChange={handleChange} TabPanelList={TabPanelList} />
    </Grid>
  )
}
export default Page 