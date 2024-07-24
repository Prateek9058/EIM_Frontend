"use client"
import { Grid, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
// import Tabs from '@/components/tabs/index'
import VehicleScheduling from '@/app/(components)/pages-component/scheduling/vehicleScheduling';
import ChargingScheduling from '@/app/(components)/pages-component/scheduling/chargingScheduling';
import { CustomDropdown } from '@/app/(components)/mui-components/DropdownButton/index';
import ManagementGrid from '@/app/(components)/mui-components/Card';

const Scheduling = () => {
  const tabs = [
    { label: "E-Tractor", value: "1", content: <VehicleScheduling /> },
    { label: "CS/SS Station", value: "2", content: <ChargingScheduling /> },
  ]
  const region = ["All", "Mumbai", "Delhi", "Agra", "Kolkata"]
  const customer = ["customer1", "customer2", "customer3", "customer4"]
  const TabPanelList = [
    { component: <VehicleScheduling /> },
    { component: <ChargingScheduling /> },
  ];
  const [value, setValue] = useState(0); // Initial active tab index

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab index
  };
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "Scheduling", link: "/scheduling" },
  ];
  const droDownButtons = [
    { label: "Region", menuItems: ["Daily", "Weekly", "Yearly"] },
    { label: "Customer", menuItems: ["Customer 1", "Customer 2", "Customer 3"] },
]
  return (
    <Grid container spacing={2} xs={12} sm={12} md={12} lg={12}>
      <Grid item xs={12} >
        <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName={"Scheduling"} dropDown={droDownButtons} buttonItem={"Refresh"} tabs={tabs} TabPanelList={TabPanelList} value={value} handleChange={handleChange} />
      </Grid>

    </Grid>
  )
}

export default Scheduling