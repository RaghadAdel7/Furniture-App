import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import {
  TextField,
  Button,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function UserLogin(prop) {
  const {getUserData}=prop;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userLogIn, setUserLogIn] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  function onChangeHandlerEmailLogIn(event) {
    setUserLogIn({ ...userLogIn, email: event.target.value });
  }

  function onChangeHandlerPasswordLogIn(event) {
    setUserLogIn({ ...userLogIn, password: event.target.value });
  }

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userLogIn.email) {
      newErrors.email = "Email is required";
    } 
    else if (!emailRegex.test(userLogIn.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!userLogIn.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const logInUser = () => {
    if (!validateForm()) return; 

    const userUrlLogIn = "http://localhost:5125/api/v1/users/signIn";

    axios
      .post(userUrlLogIn, userLogIn)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
          setMessage("Login successful!");
          setOpen(true);
        }
      })
      .then(()=> getUserData())
      .then(()=> navigate("/profile"))
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setMessage("Email not registered.");
            setOpen(true);
            setTimeout(() => navigate("/UserRegister"), 2000);
          } else if (error.response.status === 401) {
            setMessage("Incorrect password.");
            setOpen(true);
          }
        } else {
          setMessage("An error occurred. Please try again.");
          setOpen(true);
        }
      });
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

// Data for testing
// Email
// test2@gmail.com

// Password
// testing222#

  return (
    <div className="container">
      <h1> Log In</h1>
      <TextField
        id="email"
        label="Email"
        variant="standard"
        onChange={onChangeHandlerEmailLogIn}
        error={!!errors.email}
        helperText={errors.email}
        className="custom-textfield"
      />
      <br />

      <FormControl variant="standard" className="custom-textfield">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={onChangeHandlerPasswordLogIn}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide password" : "show password"}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </FormControl>
      <br />

      <Button onClick={logInUser}>Log In</Button>
      <p>
        Not yet registered?
        <Button onClick={() => navigate("/UserRegister")}>Register here</Button>
      </p>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
