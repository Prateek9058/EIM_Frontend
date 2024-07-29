"use client"
import ManagementGrid from '@/app/(components)/mui-components/Card'
import { Grid, TextField, Typography, Button } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'

const CustomGrid = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: '#6099EB',
  borderRadius: "16px",
  color: "#fff"

}))
const TimeRateSection = ({ ratePlaceholder,  }) => (
  <>
    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <TextField type='number' placeholder={ratePlaceholder}  />
    </Grid>
    <Grid item xs={2} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography>00</Typography>
    </Grid>
    <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography>00:00 hr. - 06:00 hr. & 22:00 hr. - 24:00 hr.</Typography>
    </Grid>
  </>
);
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Tariff-Management", link: "/tariffManagement" },
  { label: "Create-Tariff", link: "/tariffManagement/createTariff" },
];
const CreateTariff = () => {
  return (
    <Grid container rowGap={2}>
      <ManagementGrid breadcrumbItems={breadcrumbItems} moduleName={"Create Tariff"} />
      <CustomGrid container rowGap={5} columnGap={5}>
        <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <TextField label="Tariff Name" placeholder="Enter Tariff Name" />
        </Grid>
        <TimeRateSection ratePlaceholder="Rate - (- 1.50 )" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
        <TimeRateSection ratePlaceholder="Rate - (0.00)" />
      </CustomGrid>
      <Grid container justifyContent={"flex-end"} columnGap={2} mr={3}>
        <Button variant='outlined'>Cancel</Button>
        <Button variant='contained'>Submit</Button>
      </Grid>


    </Grid>



  )
}




export default CreateTariff