"use client";
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
  Divider,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosInstance from "@/app/api/axiosInstance";

import styled from "@emotion/styled";
const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C0FE72",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    color: "#C0FE72", // Label color when input is filled
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#fff",
    opacity: 1,
  },
}));

const AuthLogin = ({ title, subtitle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const body = {
      userName: username,
      password: password,
    };
    setErrorMessage(null);
    if (!username || !password) {
      setErrorMessage("Please provide both the username and password.");
      return;
    }
    try {
      const response = await axiosInstance.post("/auth/login", body);
      if (response.status) {
        signIn("credentials", {
          username: username,
          password: password,
          callbackUrl: `/`,
          redirect: true,
        });
        localStorage.setItem("token", response?.data?.access_Token);
      }
    } catch (error) {
      setErrorMessage(error?.response?.data?.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <>
      {title ? (
        <Typography fontWeight={"700"} variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <CustomTextField
              label="Username"
              variant="outlined"
              fullWidth
              id="username"
              name="username"
              value={username}
              inputProps={{ shrink: "true" }}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>
          <Box mt={"25px"}>
            <CustomTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                shrink: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#fff" }} />
                      ) : (
                        <Visibility sx={{ color: "#fff" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <Typography>Forget Password</Typography>
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
        </Box>
        <Divider sx={{ mt: 2 }}>or</Divider>
      </form>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        mt={2}
      >
        <Typography>
          To Know more <span style={{ color: "#C0FE72" }}>T&C</span>
        </Typography>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthLogin;
