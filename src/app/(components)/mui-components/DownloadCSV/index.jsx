import { Button } from '@mui/material';
import React from 'react'
import Papa from 'papaparse';
import { FaRegFileExcel } from "react-icons/fa";

const index = () => {
    const handleExport = (data) => {
        console.log("Exporting data", data);
      
        if (!Array.isArray(data) || data.length === 0) {
         alert("No data available to export");
          return;
        }
    
        const modifiedData = data?.map((row) => ({
          employeeId: row?.employeeId,
          firstName: row?.firstName,
          lastName: row?.lastName,
          mobileNumber:`'${row?.mobileNumber}`,
          jobRole: row?.jobRole,
          zone:row?.zone,
          device:row?.device?.deviceName
        }));
      
        const csvData = [];
        const tableHeading = "All Employees Details";
        csvData.push([[], [], tableHeading, [], []]);
        csvData.push([]);
      
        const headerRow = [
          "EmpID",
          "First Name",
          "Last Name",
          "Phone Number",
          "Job Role",
          "Zone",
          "Device Name"
        ];
        csvData.push(headerRow);
      
        modifiedData.forEach((row) => {
          const rowData = [
            row?.employeeId,
            row?.firstName,
            row?.lastName,
           row?.mobileNumber,
            row?.jobRole,
            row?.zone,
            row?.device?.deviceName
          ];
          csvData.push(rowData);
        });
      
        const csvString = Papa.unparse(csvData);
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "AllEmployeesDetails.csv");
      };
  return (
   <Button onClick={handleExport} variant='outlined'  startIcon={<FaRegFileExcel />}     size="large">Download Excel</Button>
  )
}

export default index