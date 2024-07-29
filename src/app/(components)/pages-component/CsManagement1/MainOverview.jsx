import { Grid, Typography, Divider } from '@mui/material'
import React, { useState } from 'react'
import Graph from './graph'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Graph2 from './graph2';
import Overview from '@/app/(components)/pages-component/CsManagement1/overview/Overview';
import TimerIcon from '@mui/icons-material/Timer';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import styled from "@emotion/styled";
import CommonDatePicker from"@/app/(components)/mui-components/Text-Field's/Date-range-Picker/index"
import ManagementGrid from '../../mui-components/Card';
import { ColoredChip } from '../../mui-components/Chip';

const CustomGrid = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: '#6099EB',
    borderRadius: "16px",
    color: "#fff"
}))
const Overview1 = () => {
    const [date, setDate] = useState(null);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const getDataFromChildHandler = (date, dataArr) => {
        setDate(date);
    };
    const tabs = [
        { label: "Overview (512)", },
        { label: "Charging (23)", },
        { label: "Available (14)", },
        { label: "Offline (296)", },
    ]
    const TabPanelList = [
        { component: <Overview /> },
        { component: <Overview /> },
        { component: <Overview /> },
        { component: <Overview /> },
    ];
    const data = [
        { title: 'No. of Session', content: "400" },
        { title: 'Usage', content: "1947.33 kWh" },
        { title: 'Up Time', content: "400" }
    ];
    return (
        <Grid container spacing={2} >
            {data.map((item, index) => (
                <Grid key={index} item xl={4} md={4} sm={12} xs={12}>
                    <CustomGrid>
                        <Grid container justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant='h6'><TimerIcon sx={{ verticalAlign: 'middle', p: "3px" }} /> {item.title}</Typography>
                        </Grid>
                        <Typography variant='h4' color="primary" sx={{ mt: 2 }}>{item.content} <ColoredChip
                            label="16.8 %"
                            variant="filled"
                            size='small'
                            icon={<ArrowOutwardIcon color="secondary" />}
                      /></Typography>
                        <Graph />
                        <Divider sx={{mb:3}} />
                    </ CustomGrid>
                </Grid>
            ))}
            <Grid item xs={12} >
                < CustomGrid >
                    <Grid container justifyContent={"space-between"} alignItems={"center"}>
                        <Typography><AccessTimeFilledIcon sx={{ verticalAlign: 'middle' ,p:"3px"}} />  E-Tractor charging status </Typography>
                        <CommonDatePicker
                                getDataFromChildHandler={
                                    getDataFromChildHandler
                                }/>
                    </Grid>
                    <Grid container mt={1}>
                    <Typography variant='h3' color="primary">63  <span style={{ fontSize: "15px", fontWeight: 600 }}>Charging station</span> <ColoredChip
                            label="16.8 %"
                            variant="filled"
                            size='small'
                            icon={<ArrowOutwardIcon color='secondary'/>}
                          /></Typography>
                    </Grid>
                    <Graph2 />
                </ CustomGrid>
            </Grid>
            <Grid item xs={12} >
                <ManagementGrid tabs={tabs} TabPanelList={TabPanelList} value={value} handleChange={handleChange} />
            </Grid>
        </Grid>
    )
}

export default Overview1
