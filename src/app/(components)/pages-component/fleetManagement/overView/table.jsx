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
import CustomTextField from "@/app/(components)/mui-components/Text-Field's/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { CustomDownloadExcel } from "../../../mui-components/DownloadExcel";

const Table = ({
  data,
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
    "Region",
    "E-tractor ID",
    "Status",
    "Avg. speed (km/hr.)",
    "Avg. Payload (Ton)",
    "Total distance travelled(km)",
    "Avg. Consumption(kwh/km)",
    "Breakdown",
    "NumberPlate",
    "Current Soc(%)",
    "Effective Range(km)",
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
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      region: item?.port ? item?.port?.regionName : "--",
      fleetId: item?.fleetId ? item?.fleetId : "--",
      status: (
        <Box>
          <Typography
            sx={{
              color:
                item?.status === "charging"
                  ? "#BFFC72"
                  : item?.status === "parked"
                  ? "#FFC700"
                  : item?.status === "trip"?"#0F0D15":"#fff",
            }}
          >
            {item?.status ? item?.status : "--"}
          </Typography>
        </Box>
      ),
      avgSpeed: item?.avgSpeed ? item?.avgSpeed : "--",
      avgPayload: item?.avgPayload ? item?.avgPayload : "--",
      totalDistance: item?.totalDistance ? item?.totalDistance : "--",
      avgConsumption: item?.avgConsumption ? item?.avgConsumption : "--",
      breakdown: item?.breakdown ? item?.breakdown : "--",
      numberPlate: item?.numberPlate ? item?.numberPlate : "--",
      currentSoc: item?.currentSoc ? item?.currentSoc : "--",
      effectiveRange: item?.effectiveRange ? item?.effectiveRange : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={12}>
            <Tooltip title="View">
              <Link href={`/fleetManagement/${item?._id}?tab=${value}`}>
                <IconButton size="small">
                  <IoEyeOutline color="rgba(14, 1, 71, 1)" />
                </IconButton>
              </Link>
            </Tooltip>
          </Grid>
        </Grid>,
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
          <Typography variant="h3">Fleet ({data?.totalDocuments})</Typography>
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
