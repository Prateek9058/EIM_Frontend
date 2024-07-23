"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
// import { CustomDownloadExcel } from "../../mui-components/DownloadExcel";

const Table = ({
    data,
    deviceData,
    value,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    loading,
    handleExport,
    getDataFromChildHandler,
}) => {
    const columns = [
        "Tariff ID", "Tariff name ID", "Base Rate", "00:00 hr. - 06:00 hr. & 22:00 hr. - 24:00 hr.", "06:00 hr. - 09:00 hr. & 12:00 hr. - 18:00 hr.", "09:00 hr. -12:00 hr", "18:00 hr. - 22:00 hr.",
    ];
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
    };
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

            status: (
                <Box>
                    <Typography
                        sx={{
                            color: item?.status === 'charging' ? 'green' : item?.status === 'Parked' ? 'yellow' : 'blue'
                        }}
                    >
                        {item?.status ? item?.status : "NA"}
                    </Typography>
                </Box>
            ),
            lastName: item?.lastName ?? "N/A",
            mobileNumber: item?.mobileNumber ? item?.mobileNumber : "N/A",
            mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "N/A",
            mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "N/A",
            mobileNumber3: item?.mobileNumber3 ? item?.mobileNumber3 : "N/A",
            mobileNumber4: item?.mobileNumber4 ? item?.mobileNumber4 : "N/A",
            mobileNumber5: item?.mobileNumber5 ? item?.mobileNumber5 : "N/A",
            jobRole: item?.jobRole ? item?.jobRole : "N/A",
          
        }));
    };

    return (
        <Grid container >
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{ backgroundColor: "#669BE9", color: "#fff", borderRadius: "16px 16px 0px 0px" }}>
                <Grid item>
                    <Typography variant="h3">
                        Tariff Sheet
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
    );
};

export default Table;
