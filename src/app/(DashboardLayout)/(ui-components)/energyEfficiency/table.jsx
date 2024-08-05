"use client";
import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import CustomTable from "@/app/(components)/mui-components/Table/customTable/index";
import TableSkeleton from "@/app/(components)/mui-components/Skeleton/tableSkeleton";
import CommonDatePicker from "@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import { FaRegFileExcel } from "react-icons/fa";
import ToastComponent,{notifyError,notifySuccess} from "@/app/(components)/mui-components/Snackbar";

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
  getDataFromChildHandler,
}) => {
  const columns = [
    "CS/SS Station ID",
    "Region",
    "Charger status",
    "Queue",
    "Max. capacity(kW)",
    "Current charging load(kW)",
    "E-Tractor",
    "Last session started",
    "Alerts",
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
  const handleExport = (data) => {
    console.log("Exporting data", data);

    if (!Array.isArray(data) || data.length === 0) {
      notifyError("No data available to export");
      return;
    }

    const modifiedData = data?.map((row) => ({
      batteryId: row?.batteryId,
      status: row?.status,
      swappingcycle: row?.swappingcycle,
      avgSpeed: row?.avgSpeed,
      selectedpackage: row?.selectedpackage,
      maxPayload: row?.maxPayload,
      distance: row?.distance,
      value: row?.value,
      jobRole: row?.jobRole,
    }));

    const csvData = [];
    const tableHeading = "All CS/SS Efficiency Data";
    csvData.push([[], [], tableHeading, [], []]);
    csvData.push([]);

    const headerRow = [
      "CS/SS Station ID",
      "Region",
      "Charging status",
      "Queue",
      "Max. capacity(kW)",
      "Current charging load(kW)",
      "E-Tractor",
      "Last session started",
      "Alerts",
    ];
    csvData.push(headerRow);

    modifiedData.forEach((row) => {
      const rowData = [
        row?.batteryId,
        row?.status,
        row?.swappingcycle,
        row?.avgSpeed,
        row?.selectedpackage,
        row?.maxPayload,
        row?.distance,
        row?.value,
        row?.jobRole,
      ];
      csvData.push(rowData);
    });
    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "CS/SS-EfficiencyData.csv");
    notifySuccess("Download Excel Succefully")
  };
  const handleCancel = () => {
    setOpenDialog(false);
  };
  const getFormattedData = (data) => {
    console.log("data", data);
    return data?.map((item, index) => ({
      batteryId: (
        <Box>
          <span>{item?.batteryId}</span>
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

      status: item?.status ?? "--",
      lastName: item?.lastName ?? "--",
      mobileNumber: item?.mobileNumber ? item?.mobileNumber : "--",
      mobileNumber1: item?.mobileNumber1 ? item?.mobileNumber1 : "--",
      mobileNumber2: item?.mobileNumber2 ? item?.mobileNumber2 : "--",
      mobileNumber4: item?.mobileNumber4 ? item?.mobileNumber4 : "--",
      mobileNumber5: item?.mobileNumber5 ? item?.mobileNumber5 : "--",
      jobRole: item?.jobRole ? item?.jobRole : "--",
    }));
  };

  return (
    <Grid container>
        <ToastComponent/>
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
          <Typography variant="h3">CS/SS Efficiency Data</Typography>
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
  );
};

export default Table;
