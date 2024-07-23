import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography, Grid, TextField, Divider, IconButton } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Graph from '@/app/(components)/CsManagement1/graph';

export default function AlertDialog({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false)
    };
    return (
        <React.Fragment>
            <Dialog
                open={open}
                maxWidth={"sm"} fullWidth onClose={handleClose}>
                <DialogContent sx={{ background: 'linear-gradient(112.37deg, #589CFF 0%, #013376 116.12%)' }}>
                    <Grid container rowGap={3}>
                        <Grid container direction={"column"} rowGap={2}>
                            <Grid container justifyContent={"space-between"} alignItems={"center"}> 
                            <Typography variant='h4'>Live CS/SS Load</Typography>
                            <IconButton onClick={handleClose} sx={{ color: "#fff" }}><CloseOutlinedIcon /></IconButton>
                            </Grid>
                            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>Active Session 7</Typography>
                            <Graph />
                        </Grid>
                        <Grid container direction={"column"} rowGap={2}>
                            <Typography variant='h4'>Session</Typography>
                            <Typography sx={{ fontSize: "10px", fontWeight: "600" }}>Active Session 7</Typography>
                            <Graph />
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}