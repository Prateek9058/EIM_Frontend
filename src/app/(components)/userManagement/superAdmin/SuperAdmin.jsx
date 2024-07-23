"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Chip, Tooltip, IconButton } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import { Fleet } from "../../table/rows";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "@/app/api/axiosInstance";
import CommonDialog from "../../mui-components/Dialog/index.jsx";

const Table = ({
    type
}) => {
    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [deviceData, setDeviceData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState(null);
    const [data, setData] = useState(null);
    const [open, setOpenDialog] = React.useState(false);
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);
    const [openGraph, setOpenGraph] = useState(false)
    const [Id, setId] = useState();

    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    const columns = [
        "Emp Id", "Mob. no.", "Email ID", "Location", "Assign role", "Sub admin", "Reporting manager", "Action",
    ];
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

    const handleOpenDialog = (id) => {
        setId(id)
        setOpenDialog(true);
    };

    const handleConfirm = () => {
        handleDelete()
        getData()
        handleCancel()
    };

    const handleCancel = () => {
        setOpenDialog(false);
    };
    console.log("type", type)
    const getData = async () => {
        try {
            const response = await axiosInstance.get(`user/getAll/?userType=${type}&page=${page + 1
                }&pageSize=${rowsPerPage}&search=${searchQuery}`)
            console.log("sdfj", response)
            setData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [type])
    const handleDelete = async () => {
        try {
            const response1 = await axiosInstance.delete(`/user/delete/${Id}`)
            console.log("delete", response1)
        } catch (error) {
            console.log(error)
        }
    }
    const getFormattedData = (data) => {
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
            mobileNumber: item?.mobileNumber ?? "N/A",
            emailId: item?.emailId ?? "N/A",
            address: item?.address ? item?.address : "N/A",
            role: item?.role ? item?.role : "N/A",
            subAdmin: item?.subAdmin ? item?.subAdmin?.userName : "N/A",
            parent: item?.parent?.userName ? item?.parent?.userName : "N/A",
            Action: [
                <Grid container justifyContent="center" spacing={2} key={index}>
                    <Grid item xs={4} >
                        <Tooltip title="View">
                            <Link href={`userManagement/viewAccess`}>
                                <IconButton size="small">
                                    <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} >
                        <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => { handleOpenDialog(item?._id) }}>
                                < MdDeleteOutline color="rgba(14, 1, 71, 1)" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} >
                        <Tooltip title="Edit">
                            <Link href={`/userManagement/editAccess`}>
                                <IconButton size="small">
                                    <FaEdit color="rgba(14, 1, 71, 1)" />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </Grid>
                </Grid>,
            ],
        }));
    };
    return (
        <Grid container >
            <CommonDialog
                open={open}
                fullWidth={true}
                maxWidth={"xs"}
                title="Confirmation"
                message="Are you sure you want to delete this device?"
                color="error"
                onClose={handleCancel}
                onConfirm={handleConfirm}
            />
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{ backgroundColor: "#669BE9", color: "#fff", borderRadius: "16px 16px 0px 0px" }}>
                <Grid item>
                    <Typography variant="h3">
                        {type} {data?.totalDocuments ? `(${data?.totalDocuments})` : "(0)"}
                    </Typography>
                </Grid>
                <Grid item className="customSearch">
                    <Grid container>
                        <Grid item mr={1}>
                            <CustomDownloadExcel name={"Download Excel"} rows={data} data={"SubAdmin List"} />
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
                    rows={getFormattedData(data?.data)}
                    count={data?.totalDocuments}
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
