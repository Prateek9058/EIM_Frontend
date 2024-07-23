"use client"
import React from 'react'
import { Grid, IconButton } from '@mui/material'
import Data from '@/app/(components)/table/data'
import { dashboardVehicle, dashboardScheduling,  } from '@/app/(components)/table/columndata'
import BsEye from "@mui/icons-material/VisibilityOutlined";
import MapSharpIcon from '@mui/icons-material/MapSharp';
import Link from 'next/link';
import styled from '@emotion/styled';
import { rows } from '@/app/(components)/table/rows'

const Page = () => {
  const renderActions = () => (
    <>
      <Link href={'/fleet_management/vehicle'}>
        <IconButton>
          <BsEye />
        </IconButton>
      </Link>
      <IconButton>
        <MapSharpIcon />
      </IconButton>
    </>
  );
  const buttons=[
    {data:"CS/SS Scheduling" }
  ]
  const Vehicle=[
    {button:"View All",data:"Top 10 Performing Vehicles"}
  ]
  const Scheduling =[
    {data:"Scheduling Station"}
  ]

  return (
    <Grid container rowGap={2}>
        <Data columns={dashboardVehicle} buttons={Vehicle} rows={rows} />
        <Data columns={dashboardScheduling} buttons={Scheduling} rows={rows}/>
        <Data columns={dashboardScheduling} buttons={buttons} rows={rows}/>
    </Grid>
  )
}
export default Page;