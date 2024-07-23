"use client"
import { Button, Grid, Typography } from '@mui/material'
import React,{useState} from 'react'
import Table from './table'
import { Charging_Station_id, E_Tractor_id, charging, vehicleTrip } from '@/app/(components)/table/columndata';
import { useSearchParams } from 'next/navigation'
import ManagementGrid from '@/app/(components)/mui-components/Card';

const ChargingId = ({ params }) => {
    const searchParams = useSearchParams()
    const tabValue = searchParams.get('tab')
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [deviceData, setDeviceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState(null);
    const [data, setData] = useState(null);

    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    const vehicle1 = [
         "Date","Status","Hub name","Currently charging","Avg. charging time","Peak hours"
    ]
    const E_tractor = [
       "Date","Charging cycle","Charging time","Start Soc","End SoC(%)","Current SoC(%)","Units consumed(kW)"
    ]
    const breadcrumbItems = [
        { label: "Dashboard", link: "/" },
        { label: "CS/SS-Management", link: "/csManagement" },
        { label: `${params.id}`, link: `/csManagement/${params.id}?tab=${tabValue}` },
      ];
    return (
        <Grid container rowGap={2} sm={12} md={12}>
            <ManagementGrid  breadcrumbItems ={breadcrumbItems }/>
            {tabValue && (
                tabValue === "2" ? (
                    <Table
                    name={`Charging Station ID (${params.id})`}
                    columns={vehicle1}
                    deviceData={deviceData}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    loading={loading}
                    getDataFromChildHandler={getDataFromChildHandler}
                />
                ) : tabValue === "3" ? (
                    <Table
                    name={`E-Tractor ID (${params.id})`}
                    columns={E_tractor}
                    deviceData={deviceData}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    page={page}
                    setPage={setPage}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    loading={loading}
                    getDataFromChildHandler={getDataFromChildHandler}
                />
                ) : (
                 null
                )
            )}
        </Grid>
    )
}

export default ChargingId