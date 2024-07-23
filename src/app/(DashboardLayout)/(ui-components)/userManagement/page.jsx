"use client"
import ManagementGrid from '@/app/(components)/mui-components/Card'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SuperAdmin from '@/app/(components)/userManagement/superAdmin/SuperAdmin'
import AddUser from '@/app/(components)/userManagement/addUser/AddUser'
import axiosInstance from '@/app/api/axiosInstance'

const UserManagement = () => {
  const[open,setOpen]=useState(false)
  const [data,setData]=useState()

  const[type,setType]=useState()
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleTableData=async(item)=>{
    try {
      setType(item)
      const res=await axiosInstance.get('/role/getAll')
      console.log("res",res)
      setData(res?.data?.data)
    } catch (error) {
    }
  }
  useEffect(()=>{
    handleTableData();
  },[])

  const TabPanelList = [
    { component: "" },
  ];
  const [value, setValue] = useState(0); // Initial active tab index

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab index
  }; 
  const breadcrumbItems = [
    { label: "Dashboard", link: "/" },
    { label: "User-Management", link: "/userManagement" },
    
];
console.log("setType",type)
  return (
    <Grid container >
      <AddUser open={open} setOpen={setOpen}/>
      <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName={"Super Admin"} button={"Add User"} handleClickOpen={handleOpen} handleTableData={handleTableData} CustomButtonGroup={data} TabPanelList={TabPanelList} value={value} handleChange={handleChange} />
      <SuperAdmin  type={type}/>
    </Grid>
  )
}

export default UserManagement