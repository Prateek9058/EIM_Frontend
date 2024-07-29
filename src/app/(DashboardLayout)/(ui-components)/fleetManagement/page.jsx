"use client";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Overview from "@/app/(components)/pages-component/fleetManagement/overView/Overview";
import Charging from "@/app/(components)/pages-component/fleetManagement/charging/charging";
import Trip from "@/app/(components)/pages-component/fleetManagement/Trip";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import AddTractor from "@/app/(components)/pages-component/fleetManagement/addTractor";

import axiosInstance from "@/app/api/axiosInstance";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Fleet-Management", link: "/fleetManagement" },
];
const droDownButtons = [
  { label: "Region", menuItems: ["Mumbai", "Delhi", "Agra","Punjab","Kolkata"] },
  { label: "Customer", menuItems: ["Customer 1", "Customer 2", "Customer 3"] },
];
const Page = () => {
  const [value, setValue] = useState(0); // Initial active tab index
  const [customer, setCustomer] = useState(null);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState(null);
  const [tabsValue, setTabsValue] = useState("Overview");
  const getDataFromChildHandler = (date, dataArr) => {
    setDate(date);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setTabsValue(tabs[newValue].label);
  };
  const handleCustomer = async () => {
    try {
      const response = await axiosInstance.get("/fleet/getCustomers");
      setCustomer(response?.data?.data);
      console.log("customer", response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleTableData();
  }, [value, page, rowsPerPage, searchQuery, date]);

  const tabs = [
    { label: `Overview` },
    { label: "Charging" },
    { label: "Trip" },
    // { label: "E-Tractor Report" },
  ];
  const handleTableData = async () => {
    if (tabsValue !== "Overview") {
      const response = await axiosInstance.get(
        `/fleet/getAll?status=${tabsValue}&page=${
          page + 1
        }&pageSize=${rowsPerPage}&search=${searchQuery}`
      );
      console.log("dfkja", response);
      setTableData(response?.data);
    } else {
      const response = await axiosInstance.get(
        `/fleet/getAll?page=${
          page + 1
        }&pageSize=${rowsPerPage}&search=${searchQuery}`
      );
      setOverviewData(response?.data);
      console.log("jgsdfkjgnsdfj", response);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const TabPanelList = [
    {
      component: (
        <Overview
          value={"1"}
          data={overviewData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    {
      component: (
        <Charging
          value={"2"}
          data={tableData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    {
      component: (
        <Trip
          value={"3"}
          data={tableData}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          loading={loading}
          getDataFromChildHandler={getDataFromChildHandler}
        />
      ),
    },
    // { component: <Trip value={"3"} tableData={tableData} /> },
  ];

  return (
    <Grid container xs={6} sm={12} xl={12}>
      <AddTractor open={open} setOpen={setOpen} />
      <ManagementGrid
        moduleName={"Fleet Management"}
        breadcrumbItems={breadcrumbItems}
        dropDown={droDownButtons}
        button={"Add E-Tractor"}
        handleClickOpen={handleOpen}
        tabs={tabs}
        value={value}
        handleChange={handleChange}
        TabPanelList={TabPanelList}
      />
    </Grid>
  );
};
export default Page;
