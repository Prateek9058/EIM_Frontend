"use client"
import { Grid,Button,Typography } from '@mui/material'
import React,{useState} from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Overview from '@/app/(components)/pages-component/CsManagement1/MainOverview';
import Charging from '@/app/(components)/pages-component/CsManagement1/chargingStation';
import DriverVehicle from '@/app/(components)/pages-component/CsManagement1/DriverVehicle';
import RevenueManagement from '@/app/(components)/pages-component/CsManagement1/Revenue';
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";import ManagementGrid from '@/app/(components)/mui-components/Card';
import AddTractor from '@/app/(components)/pages-component/CsManagement1/addTractor'

const CsManagement = () => {
    const [value, setValue] = useState(0); 
    const[open,setOpen]=useState(false)// Initial active tab index
    const handleChange = (event, newValue) => {
      setValue(newValue); // Update the active tab index
    };   
    const handleOpen =()=>{
      setOpen(true)
    }
    const tabs = [
        { label: "Overview", },
        { label: "Charging Station", },
        { label: "E - Tractor", },
        { label: "Revenue Management",  },
    ]
    const TabPanelList = [
        { component:  <Overview value="1"/>},
        { component: <Charging value="2" />},
        { component: <DriverVehicle value="3"/> },
        { component: <RevenueManagement value="4"/>},
      ];
      const breadcrumbItems = [
        { label: "Dashboard", link: "/" },
        { label: "CS/SS-Management", link: "/csManagement" },
      ];
      const droDownButtons = [
        { label: "Region", menuItems:  ["Mumbai", "Delhi", "Agra","Punjab","Kolkata"] },
        { label: "Customer", menuItems: ["Customer 1", "Customer 2", "Customer 3"] },
        { label: "Charging Station", menuItems: ["Charging 1", "Charging 2", "Charging 3"] }
      ]
   
    return (
        <Grid container  xs={12} sm={12} md={12}>
          <ToastComponent/>
          <AddTractor open ={open} setOpen={setOpen}/>
           <ManagementGrid moduleName={"CS/SS Management"} breadcrumbItems={breadcrumbItems} dropDown={droDownButtons}  button={"Add CS/SS"} tabs={tabs} value={value} handleChange={handleChange}  TabPanelList={TabPanelList} handleClickOpen={handleOpen}/>
        </Grid>
    )
}
export default CsManagement;
