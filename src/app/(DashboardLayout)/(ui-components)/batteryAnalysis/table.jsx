"use client";
import React, { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Box,
    Button,
    Chip,
    Tooltip,
    IconButton,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import { CustomDownloadExcel } from "@/app/(components)/mui-components/DownloadExcel/index";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomTextField from "@/app/(components)/mui-components/Text-Field's";

import { useRouter } from "next/navigation";
import { EyeIcon } from "@/app/(components)/mui-components/icons/index";

const Table = ({
    data,
    rowsPerPage,
    handleEfficiencyData,
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
        "Battery ID",
        "Status",
        "Temperature(°C)",
        "Voltage(V)",
        "Battery SoC(%)",
        "Battery SoH(%)",
        "Charging cycle",
        "Avg. Charging time",
        "Battery Location",
        "Action",
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

    const handleSearchChange = async(event) => {
        const {value}=event.target
        setDebouncedSearchQuery(value)
        await handleEfficiencyData(value)
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
    const router = useRouter();
    const handleViewClick = (id) => {
        router.push(`/batteryAnalysis/${id}`);
    };
    const getFormattedData = (data) => {
        console.log("data", data);
        return data?.map((item, index) => ({
            batteryId: item?.batteryId ? item?.batteryId : "N/A",
            status: item?.status ?? "N/A",
            temperature: item?.temperature ?? "N/A",
            voltage: item?.voltage ? item?.voltage : "N/A",
            batterySoc: item?.batterySoc ? item?.batterySoc : "N/A",
            batterySoh: item?.batterySoh ? item?.batterySoh : "N/A",
            chargingCycle: item?.chargingCycle ? item?.chargingCycle : "N/A",
            avgChargingTime: item?.avgChargingTime ? item?.avgChargingTime : "N/A",
            batteryLocation: item?.batteryLocation ? item?.batteryLocation : "N/A",
            Action: [
                <Grid container justifyContent="center" spacing={2} key={index} width={"130px"}>
                <Grid item xs={12} sm={4} md={4}>
                  <Tooltip title="View">
                    <IconButton
                      size="small"
                      onClick={() => {
                        handleViewClick(item?._id);
                      }}
                    >
                      <EyeIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <FaRegEdit color="rgba(14, 1, 71, 1)" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <MdDeleteOutline color="rgba(14, 1, 71, 1)" />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            ],
        }));
    };
    return (
        <Grid container>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                p={2}
                sx={{
                    backgroundColor: "#669BE9",
                    color: "#fff",
                    borderRadius: "16px 16px 0px 0px",
                }}
            >
                <Grid item>
                    <Typography variant="h3">Batteries Data</Typography>
                </Grid>
                <Grid item className="customSearch">
                    <Grid container>
                        <Grid item mr={1}>
                            <CustomDownloadExcel
                                name={"Download Excel"}
                                rows={data}
                                data={"Fleet (121)"}
                            />
                        </Grid>
                        <Grid item mr={1}>
                            <CommonDatePicker
                                getDataFromChildHandler={getDataFromChildHandler}
                            />
                        </Grid>
                        <CustomTextField
                            type="search"
                            placeholder="Search batteryId/ Name"
                            value={debouncedSearchQuery}
                            onChange={(e)=>{handleSearchChange(e)}}
                        />
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
