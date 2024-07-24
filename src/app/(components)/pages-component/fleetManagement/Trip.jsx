"use client"
import React, { useState, useEffect } from 'react'
import Map from '../../map/map'
import { Grid, Typography, Box, Button, Chip, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { CustomDownloadExcel } from '../../mui-components/DownloadExcel';
import { Trip } from '../../table/rows';

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

    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    const columns = [
        'Region',
        'E-tractor ID',
        'Trips',
        'Avg. Speed',
        'Avg. Payload',
        'Max. Payload',
        'Distance Traveled',
        'Avg. Breakdown',
        'Total Tevs',
        'Tves Handle 40F',
        'Tves Handle 20F',
        'Tves Each Trip',
        'Action'
    ]
    const [open, setOpenDialog] = React.useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleConfirm = () => {
        handleCancel();
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };

    const getStatus = (str) => {
        if (str?.toUpperCase() === "ACTIVE")
            return { status: "ACTIVE", color: "customChip activeGreen" };
        else return { status: "InActive", color: "customChip activeRed" };
    };
    const getStatusInfo = (ele, index) => {
        if (ele?.toUpperCase() === "ACTIVE") {
            return [
                <Chip
                    key={index}
                    sx={{ width: "120px" }}
                    className="customChip activeGreen"
                    label={ele}
                    color="primary"
                />,
            ];
        } else {
            return [
                <Chip
                    key={index}
                    className={getStatus(ele)?.color}
                    sx={{ width: "120px" }}
                    label={getStatus(ele)?.status}
                />,
            ];
        }
    }; useEffect(() => {
        setData(Trip)
    }, [])

    const getFormattedData = (data) => {
        console.log("data", data)
        return data?.map((item, index) => ({
            employeeId: (
                <Box>
                    <span>{item?.employeeId}</span>
                    <Box
                        component="span"
                        sx={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: item.color,
                            marginLeft: "10px",
                        }}
                    />
                </Box>
            ),

            firstName: item?.firstName ?? "N/A",
            TotalTripDay: (<Chip
                key={index}
                color='primary'
                sx={{ width: "50px" }}
                label={item?.TotalTripDay}
            />),
            mobileNumber1: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber2: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber3: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber4: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber5: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber6: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber7: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber8: item?.mobileNumber ? item?.mobileNumber : "N/A",
            jobRole: item?.jobRole ? item?.jobRole : "N/A",
            Action: [
                <Grid container justifyContent="center" spacing={2} key={index}>
                    <Grid item xs={12} >
                        <Tooltip title="View">
                            <Link href={`/fleetManagement/123?tab=${value}`}>
                                <IconButton size="small">
                                    <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                </Grid>,
            ],
        }));
    }
    return (
        <Grid container >
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
                            Fleet (121)
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