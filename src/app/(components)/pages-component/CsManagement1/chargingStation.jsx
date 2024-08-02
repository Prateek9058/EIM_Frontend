"use client";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegFileExcel } from "react-icons/fa";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { ChargingStationRow } from "../../table/rows";
import { notifyError,notifySuccess } from "../../mui-components/Snackbar";

const columns = [
  "Charger station ID",
  "Status",
  "Hub Name",
  "In queue",
  "Currently charging",
  "Total charged",
  "Avg. charging time",
  "Peak hours",
  "Action",
];
const Charging = ({ value }) => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpenDialog] = React.useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
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
  useEffect(() => {
    setData(ChargingStationRow);
  }, []);
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      region: row?.region,
      status: row?.status,
      hubname: row?.trip,
      avgSpeed: row?.avgSpeed,
      avgPayload: row?.avgPayload,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      value: row?.value,
    }));

    const csvData = [];
    const tableHeading = "All CS charging Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "Charger station ID",
      "Status",
      "Hub Name",
      "In queue",
      "Currently charging",
      "Total charged",
      "Avg. charging time",
      "Peak hours",
      "Action",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
      row?.region,
       row?.status,
        row?.trip,
      row?.avgSpeed,
     row?.avgPayload,
      row?.maxPayload,
       row?.distance,
         row?.value,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CSChargingData.csv");
    notifySuccess("Download Excel Succefully")
  };

  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      region :item?.region?item?.region:"--",
      status: (
        <Box>
          <Typography
            sx={{
              color: item?.status === "Online" ? "green" : "red",
            }}
          >
            {item?.status ? item?.status : "--"}
          </Typography>
        </Box>
      ),
      lastName: item?.lastName ?? "--",
      mobileNumber: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
      mobileNumber3: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
      mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",

      value: item?.value ? item?.value : "--",
      Action: [
        <Grid container justifyContent="center" spacing={2} key={index}>
          <Grid item xs={12}>
            <Tooltip title="View">
              <Link href={`/csManagement/1235?tab=${value}`}>
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
            <Typography variant="h3">Charging Station</Typography>
          </Grid>
          <Grid item className="customSearch">
            <Grid container>
              <Grid item mr={1}>
              <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    handleExport(data);
                  }}
                  startIcon={<FaRegFileExcel />}
                  size="large"
                >
                  Download Excel
                </Button>
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
  );
};
export default Charging;
