"use client";
import ManagementGrid from "@/app/(components)/mui-components/Card";
import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { CustomGrid } from "@/app/(components)/mui-components/CustomGrid";
import { useForm } from "react-hook-form";
import { Visibility,VisibilityOff } from "@/app/(components)/mui-components/icons";
import { useRouter } from "next/navigation";

const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "Settings", link: "/settings" },
  { label: "Edit", link: "/settings/edit" },
];
const Edit = () => {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const formData = getValues();
  const router= useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setPasswordVisible((prev) => !prev);
    } else if (field === "confirmPassword") {
      setConfirmPasswordVisible((prev) => !prev);
    }
  };
  const onsubmit = () => {
    console.log("sdljgjakjh", formData);
  };
  const handleBackClick = () => {
    router.push('/settings'); // Replace '/desired-page' with your actual route
  };
  return (
    <Grid container rowGap={2} position={"relative"}>
      <ManagementGrid moduleName={"Edit"} breadcrumbItems={breadcrumbItems} />
      <form onSubmit={handleSubmit(onsubmit)}>
        <Grid container>
          <CustomGrid container>
            <Grid container rowGap={5} mt={4} pl={2} mb={2}>
              <Grid item xs={5}>
                <Typography>Current Password</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter current password"
                  fullWidth
                  type={"password"}
                  {...register("password", {
                    required: "current password is required!",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography>New Password</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter new password"
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {passwordVisible ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                  {...register("newpassword", {
                    required: "password is required!",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:<,.>])[A-Za-z\d!@#$%^&*()\-_=+{};:<,.>]{6,}$/,
                      message:
                        "must conatin atleast 1 uppercase letter, lowercase letter, digit, and special character and must be of 6 digit",
                    },
                  })}
                  error={!!errors.newpassword}
                  helperText={errors.newpassword?.message}
                />
              </Grid>
              <Grid item xs={5}>
                <Typography>Confirm Password</Typography>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="Enter confirm password"
                  fullWidth
                  type={confirmPasswordVisible ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {confirmPasswordVisible ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                  {...register("confirm", {
                    required: "",
                    validate: (value) => {
                      return value === getValues("newpassword")
                        ? null
                        : "password mismatched!";
                    },
                  })}
                  error={errors.confirm ? true : false}
                  helperText={errors.confirm && errors.confirm.message}
                />
              </Grid>
            </Grid>
          </CustomGrid>
          <Grid
            container
            justifyContent={"flex-end"}
            columnGap={2}
            mr={2}
            mt={2}
          >
            <Button variant="outlined" size="large" onClick={handleBackClick}>
              Back{" "}
            </Button>
            <Button variant="contained" size="large" type="submit">
              Submit{" "}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default Edit;
