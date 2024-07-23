"use client"
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    Checkbox,
    TextField
} from "@mui/material";
import CustomTextField from "@/app/(components)/forms/theme-elements/CustomTextField";
import axiosInstance from "@/app/api/axiosInstance";
const AuthLogin = ({ title, subtitle,  }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const handleLogin = async () => {
        event.preventDefault();
        const body = {
            userName: username,
            password: password,
        }
        setErrorMessage(null)
        if (!username || !password) {
            setErrorMessage("Please provide both the username or password.")
            return
        }
        try {
            const response = await axiosInstance.post(
                "/auth/login",
                body
            );
            console.log(response)
            if (response.status) {
                signIn("credentials", {
                    username: username,
                    password: password,
                    callbackUrl: `/`,
                    redirect: true,
                });
                localStorage.setItem("token", response?.data?.access_Token)
            }
        }
        catch (error) {
            console.log("Catch Block Work", error);
            setErrorMessage(error?.response?.data?.message);
        }
    }
    return (
        <>
            {title ? (<Typography fontWeight={"700"} variant="h2" mb={1}></Typography>) : null}
            <form onSubmit={handleLogin}>
                <Stack>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="username"
                            mb="5px">
                            Username
                        </Typography>
                        <TextField
                            variant={"outlined"}
                            fullWidth
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </Box>
                    <Box mt={"25px"}>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            component="label"
                            htmlFor="password"
                            mb="5px">
                            Password
                        </Typography>
                        <TextField
                            type="password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                    </Box>
                    <Stack
                        justifyContent="space-between"
                        direction="row"
                        alignItems="center"
                        my={2}
                    >
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        defaultChecked
                                        sx={{
                                            color: "secondary.main",
                                        }}
                                    />
                                }
                                label="Remember this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Box>
                    <Button
                        color="secondary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Box>{" "}

            </form>
            {subtitle}
        </>
    )
}

export default AuthLogin