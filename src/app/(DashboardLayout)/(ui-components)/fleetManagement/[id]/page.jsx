"use client";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "./table";
// import { vehicle, vehicleTrip, vehicleCharging } from '../columndata';
import { useSearchParams } from "next/navigation";
import { Fleet } from "@/app/(components)/table/rows";

const vehicleTrip = [
  "Date",
  "Total Trip/Day",
  "Avg. Speed",
  "Avg. Payload",
  "Distance Traveled",
  "Avg. Breakdown",
  "Total Tevs",
  "Tves Handle 40F",
  "Tves Handle 20F",
];
const vehicle = [
  "Date",
  "E-Tractor Status",
  "Avg. Speed (Km/hrs)",
  "Avg. Payload (Ton)",
  "Total Distance Traveled (Km)",
  "Avg. Consumption(keh/km)",
  "Breakdown",
  "Live SoC(%)",
  "Effective Range",
];
const vehicleCharging = [
  "Date",
  "Last SoC(%)",
  "Last SoH(%)",
  "Last Status",
  "Charging cycle",
  "Swapping Cycle",
  "Total Unit consumed(kwh)",
  "Estimated charging time",
  "Current charging time",
];

const Page = ({ params }) => {
  const searchParams = useSearchParams();
  const tabValue = searchParams.get("tab");
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
  useEffect(() => {
    setData(Fleet);
  }, []);
  return (
    <Grid container rowGap={2} sm={12} md={12}>
      {tabValue &&
        (tabValue === "1" ? (
          <Table
            data={data}
            params={params}
            columns={vehicle}
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
        ) : tabValue === "2" ? (
          <Table
            data={data}
            params={params}
            columns={vehicleCharging}
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
          <Table
            data={data}
            params={params}
            columns={vehicleTrip}
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
        ))}
    </Grid>
  );
};
export default Page;
