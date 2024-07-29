"use client"
import React, { useState, useEffect } from 'react'
import Map from '../../map/map'
import { Grid, Typography, Box, Button, Chip, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from '../../mui-components/DownloadExcel'; 
import { RevenueManagementData  } from '../../table/rows';
import ManagementGrid from '../../mui-components/Card';
import Fusion from './fusion'

const iconUrls = [
    { icon: '/truck1.svg', color: "blue" },
    { icon: '/truck2.svg', color: "red" },
    { icon: '/truck3.svg', color: "green" },
    { icon: '/truck4.svg', color: "skyblue" },
];
const coordinate = [
    { lat: "28.51079782059423", log: "77.40362813493975" },
    { lat: "28.510404514720925", log: "77.40712974097106" },
    { lat: "28.512297585971584", log: "77.40356012099012" },
    { lat: "28.510728275696316", log: "77.40199688895548" },
    { lat: "28.511107212816803", log: "77.4063730115565" },
    { lat: "28.512937158827324", log: "77.41783963937374" },
]
const buttonData = [
    { label: 'Offline', color: "red" },
    { label: 'Charging', color: "green" },
    { label: 'Trip', color: "blue" },
    { label: 'Parked', color: "skyblue" },
];
const days = ["Today", "Weekly", "Yearly"]
const region = ["mumbai", "Delhi", "Agra", "banaras", "kolkata"]
const buttons = [
    {
        data: "Fleet (212)", customdownload: "Download Excel",
        regiondropdown: [{ name: "Region", variant: "outlined", region: region }],
        dailydropdown: [{ name: "Today", variant: "contained", days: days }]
    }
];
const Charging = ({ value }) => {
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [deviceData, setDeviceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState(null);
    const [data, setData] = useState(null);
    const [fusion,setFusion]=useState(false)
    const [fusionValue,setFusionValue]=useState(null)
    const [open, setOpenDialog] = React.useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    const columns =[
        'E-Tractor ID',
        'Charging Cycle',
        'Units Consumed',
        'Swapping Cycle',
        'Units Consumed',
        'Total Unit',
        'Selected Package',
        'Variable Unit',
        'Variable bill',
        'Total bill'
      ]

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchQuery(debouncedSearchQuery);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [debouncedSearchQuery, setSearchQuery]);

    const handleSearchChange = (event) => {
        setDebouncedSearchQuery(event.target.value);
    };
    const handleOpenFusion =(item)=>{
        setFusion(true)
        setFusionValue(item)
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleConfirm = () => {
        handleCancel();
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

  useEffect(() => {
        setData( RevenueManagementData )
    }, [])

    const getFormattedData = (data) => {
        console.log("data", data)
        return data?.map((item, index) => ({
            Id :item?.Id?item?.Id:"--",
            chargingcycle:( <Chip
                key={index}
                color="primary"
                sx={{ width: "80px" ,color:"#C0FE72"}}
                label={ item?.chargingcycle }
            />),   
            lastName: item?.lastName ?? "--",
            swappingcycle:( <Chip
                key={index}
                color="primary"
                sx={{ width: "80px" ,color:"#C0FE72"}}
                label={ item?.swappingcycle }
            />),  
            mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
            mobileNumber3: item?.mobileNumber3 ? item?.mobileNumber3 : "--",
            mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",
            selectedpackage:( <Chip
                key={index}
                color="primary"
                sx={{ width: "80px",color:"#C0FE72" }}
                label={ item?.selectedpackage}
                onClick={()=>{handleOpenFusion(item?.selectedpackage)} }
            />),
            mobileNumber4: item?.mobileNumber4 ? item?.mobileNumber4 : "--",
         
            jobRole: item?.jobRole ? item?.jobRole : "--",
        }));
    }
    return (
        <Grid container >
            <Fusion open={fusion} setOpen={setFusion} fusionValue={fusionValue}/>
            <Grid item xs={12} height={"380px"}>
                <Map iconUrls={iconUrls} buttonData={buttonData} coordinate={coordinate} />
            </Grid>
            <Grid container >
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                    sx={{ backgroundColor: "#669BE9", color: "#fff", borderRadius: "16px 16px 0px 0px" }}>
                    <Grid item>
                        <Typography variant="h3">
                           Revenue Management
                        </Typography>
                    </Grid>
                    <Grid item className="customSearch">
                        <Grid container>
                            <Grid item mr={1}>
                                <CustomDownloadExcel name={"Download Excel"} rows={data} data={"Fleet (121)"} />
                            </Grid>
                            <Grid item mr={1}>
                                <CommonDatePicker
                                    getDataFromChildHandler={
                                        getDataFromChildHandler
                                    }
                                />
                            </Grid>
                            {/* <CustomTextField
                            type="search"
                            placeholder="Search empId / Name"
                            value={debouncedSearchQuery}
                            onChange={handleSearchChange}
                        /> */}
                        </Grid>
                    </Grid>
                </Grid>
                {loading ? (
                    <TableSkeleton
                        rowNumber={new Array(10).fill(0)}
                        tableCell={new Array(5).fill("15%")}
                        actions={new Array(2).fill(0)}
                    />
                ) : (
                    <CustomTable
                        page={page}
                        rows={getFormattedData(data)}
                        count={data?.length}
                        columns={columns}
                        setPage={setPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                )}

            </Grid>
        </Grid>
    )
}

export default Charging