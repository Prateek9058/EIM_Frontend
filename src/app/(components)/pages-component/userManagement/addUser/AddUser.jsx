"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useDropzone } from "react-dropzone";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Typography,
  Grid,
  TextField,
  Divider,
  IconButton,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddIcon from "@mui/icons-material/Add";
import AddRole1 from "./AddRole";
import { useForm } from "react-hook-form";
import axiosInstanceImg from "@/app/api/axiosInstanceImg";
import ToastComponent, {
  notifyError,
  notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstance from "@/app/api/axiosInstance";

export default function AddUser({ open, setOpen, handleTableData }) {
  const [open1, setOpen1] = React.useState(false);
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const formdata2 = getValues();
  const { errors } = formState;
  const [file, setFile] = useState(null);
  const [manager, setManager] = React.useState(null);
  const [selectManager, setSelectManager] = React.useState(null);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(null);
  const [role, setRole] = useState(null);
  const [selectRole, setSelectRole] = useState(null);
  const [subAdmin, setSubAdmin] = useState(null);
  const [selectSubAdmin, setSelectSubAdmin] = useState(null);

  const handleSubAdmin = (event) => {
    setSelectSubAdmin(event.target.value);
  };
  const handleManager = (event) => {
    setSelectManager(event.target.value);
    console.log("event", event);
  };
  const handleRole = (event) => {
    setSelectRole(event.target.value);
    console.log("rolfgjgjdgje", event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setProgress(0);
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 10485760,
  });
  const handleClose = () => {
    setOpen(false);
    setFile();
    reset();
    setManager();
    setRole();
  };
  const handleOpen = () => {
    setOpen1(true);
  };
  const upLoadFile = async (formdata2) => {
    if (!file) {
      notifyError("No file selected");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("userName", formdata2.userName);
    formData.append("emailId", formdata2.emailId);
    formData.append("mobileNumber", formdata2.mobileNumber);
    formData.append("level", formdata2.level);
    formData.append("role", formdata2.role);
    formData.append("address", formdata2.address);
    formData.append("employeeId", formdata2.employeeId);
    formData.append("parent", formdata2.parent);
    formData.append("subAdmin", formdata2.subAdmin);
    try {
      const response = await axiosInstanceImg.post(
        "/user/createUser",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
      );
      console.log("response", response);
      if (response?.status === 200 || response?.status === 201) {
        notifySuccess(response?.data?.message);
        handleTableData();
        handleClose();
      } else {
        notifyError("Failed to upload file");
      }
    } catch (error) {
      notifyError(error?.response?.data?.message);
    }
  };

  const AddRole = async (level) => {
    try {
      console.log("level", level);
      const response = await axiosInstance.get(
        `/role/getRolesWithLevel?level=${level}`
      );
      if (response?.status === 200 || response?.status === 201) {
        setRole(response?.data?.data);
        console.log("response", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddManager = async (level) => {
    try {
      const response = await axiosInstance.get(
        `/user/getAllParents?level=${level}`
      );
      if (response?.status === 200 || response?.status === 201) {
        setManager(response?.data?.data);
        console.log("manager", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const AddSubAdmin = async () => {
    try {
      const response = await axiosInstance.get(`/user/getAllSubAdmins`);
      if (response?.status === 200 || response?.status === 201) {
        setSubAdmin(response?.data?.data);
        console.log("subadmin", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleLevel = (e) => {
    AddRole(e.target.value);
    AddManager(e.target.value);
    setManager();
    setSelectManager();
    setRole();
    setSelectRole();
  };
  useEffect(() => {
    AddSubAdmin();
  }, [open]);

  return (
    <React.Fragment>
      {open1 && (
        <AddRole1
          open={open1}
          setOpen={setOpen1}
          handleTableData={handleTableData}
        />
      )}
      <Dialog open={open} maxWidth={"sm"} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit(upLoadFile)} noValidate>
          <DialogTitle>
            <Grid container justifyContent="flex-end">
              <IconButton onClick={handleClose}>
                <CloseOutlinedIcon />
              </IconButton>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <Grid container rowGap={2}>
              <Grid container justifyContent={"space-between"}>
                <Typography variant="h5">Add User</Typography>
                <Button
                  variant="outlined"
                  endIcon={<AddIcon />}
                  onClick={handleOpen}
                >
                  Add New Role
                </Button>
              </Grid>
              {file ? (
                <Grid
                  container
                  direction="column"
                  sx={{ marginBottom: "16px" }}
                >
                  <Typography>File added</Typography>
                  <Grid
                    sx={{
                      background:
                        "linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)",
                      borderRadius: "16px",
                      padding: 1,
                    }}
                  >
                    <Grid
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography sx={{ marginLeft: 5 }} variant="body2">
                        {file.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        {`${(file?.size / 1024).toFixed(2)} KB`}
                      </Typography>
                    </Grid>
                    <Box display="flex" alignItems="center">
                      <InsertDriveFileIcon
                        sx={{ marginRight: 1, color: "#fff" }}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ flexGrow: 1 }}
                      />
                    </Box>
                  </Grid>
                  <Typography variant="body2" sx={{ marginTop: "8px" }}>
                    {progress?.toFixed(2)}% uploaded
                  </Typography>
                </Grid>
              ) : (
               selectRole?.toLowerCase() ==='sub admin' && (
                  <Grid
                    container
                    direction="column"
                    rowGap={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      border: `3px dotted #fff`,
                      padding: 2,
                      borderRadius: "8px",
                    }}
                    {...getRootProps()}
                  >
                    <IconButton size="large">
                      <CloudUploadOutlinedIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h5">
                      Select a logo file or drag and drop here
                    </Typography>
                    <Typography>
                      xlsx, csv file size no more than 10MB
                    </Typography>
                    <input {...getInputProps()} />
                    <label htmlFor="raised-button-file">
                      <Button
                        variant="contained"
                        component="span"
                        sx={{ color: "#C0FE72" }}
                      >
                        Select File
                      </Button>
                    </label>
                  </Grid>
                )
              )}

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Enter Username"
                      {...register("userName", {
                        required: "username is required!",
                      })}
                      error={!!errors.userName}
                      helperText={errors.userName?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Enter Mobile number"
                      {...register("mobileNumber", {
                        required: "mobile number is required!",
                        pattern: {
                          value: /^(0|91)?[6-9][0-9]{9}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Enter Email ID"
                      {...register("emailId", {
                        required: "email is required!",
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      error={!!errors.emailId}
                      helperText={errors.emailId?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Enter Address"
                      {...register("address", {
                        required: "location is required!",
                      })}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <TextField
                      fullWidth
                      placeholder="Enter Level"
                      type="number"
                      {...register("level", {
                        required: "level is required!",
                        min: { value: 1, message: "Level cannot be negative!" },
                        max: {
                          value: 6,
                          message: "level cannot be greater than 6 ",
                        },
                        onChange: (e) => {
                          handleLevel(e);
                        },
                      })}
                      error={!!errors?.level}
                      helperText={errors?.level?.message}
                    />
                    <TextField
                      fullWidth
                      placeholder="Enter Employee ID"
                      {...register("employeeId", {
                        required: "employeeId is required!",
                      })}
                      error={!!errors.employeeId}
                      helperText={errors.employeeId?.message}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    <FormControl fullWidth error={!!errors.role}>
                      <InputLabel id="demo-simple-select-label">
                        Select Role
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // inputProps={{shrink:true}}
                        value={selectRole}
                        label="Select Role"
                        {...register("role", {
                          required: "Role is required!",
                          onChange: (e) => {
                            handleRole(e);
                          },
                        })}
                      >
                        {role &&
                          role?.map((item, index) => (
                            <MenuItem key={index} value={item?.name}>
                              {item?.name}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {" "}
                        {errors.role && errors.role.message}
                      </FormHelperText>
                    </FormControl>
                    <FormControl fullWidth error={!!errors.parent}>
                      <InputLabel id="parent">Reporting Manager</InputLabel>
                      <Select
                        labelId="parent"
                        id="parent"
                        value={selectManager}
                        label="Reporting Manager"
                        {...register("parent", {
                          required: "Manager is required!",
                          onChange: (e) => {
                            handleManager(e);
                          },
                        })}
                      >
                        {manager &&
                          manager?.map((item, index) => (
                            <MenuItem key={index} value={item?._id}>
                              {item?.userName}
                            </MenuItem>
                          ))}
                      </Select>
                      <FormHelperText>
                        {" "}
                        {errors?.parent && errors?.parent?.message}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container rowGap={3}>
                    {selectRole?.toLowerCase() !=='sub admin' &&
                      <FormControl fullWidth error={!!errors.subAdmin}>
                        <InputLabel id="demo-simple-select-label">
                          Select SubAdmin
                        </InputLabel>
                        <Select
                          labelId="subAdmin"
                          id="subAdmin"
                          value={selectSubAdmin}
                          label="subAdmin"
                          {...register("subAdmin", {
                            required: "Role is required!",
                            onChange: (e) => {
                              handleSubAdmin(e);
                            },
                          })}
                        >
                          {subAdmin &&
                            subAdmin?.map((item, index) => (
                              <MenuItem key={index} value={item?._id}>
                                {item?.userName}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                          {" "}
                          {errors.subAdmin && errors.subAdmin.message}
                        </FormHelperText>
                      </FormControl>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button size="large" variant="contained" type="submit">
              Add User
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
