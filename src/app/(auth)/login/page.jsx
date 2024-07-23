// "use client";
// import {
//   Button,Grid, Stack, TextField, Typography, Divider, OutlinedInput, FormControl, InputAdornment, InputLabel, IconButton,
// } from "@mui/material";
// import React from "react";
// import { LuEye } from "react-icons/lu";
// import { FaRegEyeSlash } from "react-icons/fa";

// const { default: PageContainer } = require("@/app/(components)/container/PageContainer");

// const Login = ({ theme }) => {
//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//   return (
// <PageContainer title={"Login"} description={"this is login page"}>
//     <Grid container height={"100vh"}>
//       <Grid
//         container
//         alignItems={"center"}
//         justifyContent={"center"}
//         xs={6}>
//         <Stack rowGap={3}>
//           <Stack rowGap={1}>
//             <Typography variant="h3" color={"primary"}>Log In</Typography>
//             <Typography>Please Login In to continue to your Account</Typography>
//           </Stack>
//           <Stack rowGap={2}>
//             <TextField label="Email" placeholder="Enter Email" type="email" />
//             <FormControl variant="outlined">
//               <InputLabel>Password</InputLabel>
//               <OutlinedInput
//                 type={showPassword ? "text" : "password"}
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleClickShowPassword}
//                       onMouseDown={handleMouseDownPassword}
//                       edge="end"
//                     >
//                       {showPassword ? <FaRegEyeSlash /> : <LuEye />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//                 label="Password"
//               />
//             </FormControl>
//               <Typography>Forget Password</Typography>
//             <Button variant="contained">Sign in</Button>
//             <Divider sx={{ borderColor: 'divider' }}>or</Divider>
//           </Stack>
//           <Stack alignItems={"center"} justifyContent={"center"} >
//             <Typography>To know more T&C</Typography>
//           </Stack>
//         </Stack>
//       </Grid>
//       <Grid item xs={6} sx={{ backgroundColor: "#07121B" }}>

//       </Grid>
//     </Grid>
// <PageContainer/>
//   );
// };

// export default Login;
"use client"
import React from 'react'
import { Grid, Box, Card, Stack, Typography, IconButton, } from "@mui/material";
import PageContainer from '@/app/(components)/container/PageContainer';
import AuthLogin from '@/app/(components)/authentication/AuthLogin';

const Login = () => {
    return (
        <>
            <PageContainer title={"Login"} description={"this is login page"}>
                <Box
                    sx={{
                        position: "relative",
                        "&:before": {
                            content: '""',
                            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
                            backgroundSize: "400% 400%",
                            animation: "gradient 15s ease infinite",
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            opacity: "0.3",
                        },
                    }}>
                    <Grid container spacing={0} justifyContent={"center"} sx={{ height: "100vh" }}>
                        <Grid container
                            alignItems={"center"}
                            justifyContent={"center"} xs={6}>
                            <Stack rowGap={3}>
                                <Stack rowGap={1}>
                                    <Typography variant="h3">Log In</Typography>
                                    <Typography>Please Login In to continue to your Account</Typography>
                                </Stack>
                                <Stack />
                                <AuthLogin
                                    subtitle={
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent="center"
                                            mt={3}
                                        >
                                        </Stack>
                                    } />
                            </Stack>
                        </Grid>
                        <Grid item xs={6} sx={{ backgroundColor: "#07121B" }}>

                        </Grid>

                    </Grid>
                </Box>
            </PageContainer>
        </>
    )
}

export default Login