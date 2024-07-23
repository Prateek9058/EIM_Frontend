"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Grid, TextField, IconButton,  } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useForm,  } from "react-hook-form";

export default function AddUser({ open, setOpen }) {
    const { register, handleSubmit, formState, reset, setValue } = useForm();
    const { errors } = formState;
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleClose = () => {
        setOpen(false);
        reset();
    };
    const onsubmit = () => {
        console.log("hello")
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                maxWidth={"xs"}
                onClose={handleClose}
                >
                
                    <DialogTitle>
                        <Grid container justifyContent="flex-end" >
                            <IconButton onClick={handleClose}>
                                <CloseOutlinedIcon />
                            </IconButton>
                        </Grid>
                    </DialogTitle>
                    <DialogContent >
                        <Grid container spacing={2} >
                           
                        </Grid>
                    </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
