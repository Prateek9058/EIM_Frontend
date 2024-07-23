"use client"
import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import { useDropzone } from "react-dropzone";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Grid, TextField, Box, IconButton, FormControl ,Select,MenuItem,InputLabel,FormHelperText   } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import ToastComponent, {
    notifyError,
    notifySuccess,
} from "@/app/(components)/mui-components/Snackbar/index";
import axiosInstanceImg from '@/app/api/axiosInstanceImg';
import axiosInstance from '@/app/api/axiosInstance';

export default function AddUser({ open, setOpen }) {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState, reset, getValues } = useForm();
    const { errors } = formState;
    const formdata2=getValues()
    console.log("jasbkjas",formdata2)
    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setProgress(0);
    }
    const handleClose = () => {
        setOpen(false);
        setFile()
        reset()
    };
    const onsubmit = async() => {
        if (!file) {
            notifyError("No file selected");
            return;
        } 
        const formData = new FormData();     
        formData.append("file", file)
        try {
            const response=await axiosInstanceImg.post('/station/bulkUpload', formData,
                {
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setProgress(percentCompleted);
                        }
                    },
                })
                console.log("response", response)
                if (response?.status === 200 || response?.status === 201) {
                    notifySuccess(response?.data?.message);
                    handleClose();
                } else {
                    notifyError("Failed to upload file");
                }
        } catch (error) {
            notifyError(error?.response?.data?.message);
        }
    }
    const submitDetails=async(formdata2)=>{
        try {
            const response =await axiosInstance.post("/station/create",formdata2)
            if (response?.status === 200 || response?.status === 201) {
                notifySuccess(response?.data?.message);
                handleClose();
            } else {
                notifyError("Failed to add station");
            }
        } catch (error) {
            notifyError(error?.response?.data?.message);
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxSize: 10485760,
    });
    const handleCancel=()=>{
        setFile()
    }
    return (
        <React.Fragment >
            <Dialog
                open={open}
                maxWidth={"sm"}
                onClose={handleClose}
            ><ToastComponent/>
                <form onSubmit={handleSubmit(submitDetails)}  >
                    <DialogTitle fullWidth >
                        <Grid container justifyContent="flex-end" alignItems={"center"}>
                            <IconButton onClick={handleClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </DialogTitle>
                    <DialogContent fullWidth  >
                        <Typography variant='h5'>Add CS/SS</Typography>
                        <Grid container rowGap={2} mt={4}>
                            {file ? <Grid container direction={"column"} sx={{ marginBottom: "16px" }}>
                                <Typography>File added</Typography>
                                <Grid sx={{ background: ' linear-gradient(111.41deg, rgba(139, 153, 173, 0.36) 0%, rgba(255, 255, 255, 0.12) 100%)', borderRadius: "16px", padding: 1 }}>
                                    <Grid display="flex" alignItems="center" justifyContent={"space-between"}>
                                        <Typography sx={{ marginLeft: 5 }} variant='body2'>{file.name}</Typography>
                                        <Grid item display={"flex"} alignItems={"center"}>
                                        <Typography variant="body2" sx={{ color: "#fff" }}>{`${(file?.size / 1024).toFixed(2)} KB`}</Typography>
                                        <IconButton size='small'><MdCancel onClick={handleCancel}/></IconButton>
                                        </Grid>
                                    </Grid>
                                    <Box display="flex" alignItems="center" >
                                        <InsertDriveFileIcon sx={{ marginRight: 1, color: "#fff" }} />
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
                            </Grid> : <Grid container
                                direction={"column"}
                                rowGap={2}
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{
                                    border: `3px dotted #C0FE72`, padding: 2, borderRadius: "8px"
                                }} {...getRootProps()}>
                                <IconButton size='large'><CloudUploadOutlinedIcon fontSize='large' /></IconButton>
                                <Typography variant='h5'>Select a file or drag and drop here</Typography>
                                <Typography> csv file size no more than 10MB</Typography>
                                <input
                                    {...getInputProps()}
                                     accept=".csv"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span" sx={{ color: '#C0FE72' }}>
                                        Select File
                                    </Button>
                                </label>
                            </Grid>}
                            <Grid container spacing={2} >
                                <Grid item xs={6} >
                                    <Grid container rowGap={3} >
                                    <TextField
                                            fullWidth
                                            placeholder="Enter Name"
                                            {...register("name", { required: "name is required!" })}
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                          <TextField
                                        fullWidth
                                        placeholder="Ente serialNumber"
                                        {...register("serialNumber", { required: "serialNumber is required!" })}
                                        error={!!errors.serialNumber}
                                        helperText={errors.serialNumber?.message}
                                        />
                                            
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container rowGap={3}>
                                    <TextField
                                            fullWidth
                                            placeholder="Ente address"
                                            {...register("address", { required: "address is required!" })}
                                            error={!!errors.address}
                                            helperText={errors.address?.message}
                                        /> 

                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container rowGap={3}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            placeholder="Description"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: "center" }}>
                       {file? <Button size='large' variant='contained' type='submit'>Add CS/SS</Button>:<Button size='large' variant='contained' onClick={onsubmit}>Add CS/SS</Button>}
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
