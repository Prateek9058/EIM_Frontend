"use client";
import React, { useState, useEffect } from "react";
import { Grid, IconButton } from "@mui/material";
import { rows } from "@/app/(components)/table/rows";
import Table from './table'
import { useRouter } from "next/navigation";

const Page = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [deviceData, setDeviceData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const router=useRouter();

  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };

  useEffect(()=>{
    setData(rows)
  },[])
  const handleView=()=>{
    router.push('/fleetManagement')
  }
  return (
    <Grid container rowGap={2}>
      <Table
        data={data}
        heading={"Top 10 Performing E-Tractors"}
        button={"View all"}
        handleView={handleView}
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
      <Table
        data={data}
        deviceData={deviceData}
        heading={"Swapping Station"}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        getDataFromChildHandler={getDataFromChildHandler}
      />
      <Table
        data={data}
        deviceData={deviceData}
        rowsPerPage={rowsPerPage}
        heading={"Charging Station"}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        loading={loading}
        getDataFromChildHandler={getDataFromChildHandler}
      />
    </Grid>
  );
};
export default Page;
