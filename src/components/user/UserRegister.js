import "./UserSignIn.css";
import React, { useState, useEffect } from "react";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [userInformation, setUserInformation] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    birthDate: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await axios.get(
          "https://backendproject-cn6u.onrender.com/api/v1/users"
        );
        setRegisteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching registered users:", error);
      }
    };

    fetchRegisteredUsers();
  }, []);

  function onChangeHandler(event) {
    setUserInformation({
      ...userInformation,
      [event.target.id]: event.target.value,
    });
  }

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!userInformation.username) {
      newErrors.username = "Username is required";
    } else if (
      registeredUsers.some((user) => user.username === userInformation.username)
    ) {
      newErrors.username = "Username is already taken";
    }

    if (!userInformation.firstName)
      newErrors.firstName = "First name is required";
    if (!userInformation.lastName) newErrors.lastName = "Last name is required";

    if (!userInformation.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userInformation.email)) {
      newErrors.email = "Email format is invalid";
    } else if (
      registeredUsers.some((user) => user.email === userInformation.email)
    ) {
      newErrors.email = "Email is already registered";
    }

    if (!userInformation.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(userInformation.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain at least one number and one special character.";
    }

    if (!userInformation.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex.test(userInformation.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    } else if (
      registeredUsers.some(
        (user) => user.phoneNumber === userInformation.phoneNumber
      )
    ) {
      newErrors.phoneNumber = "Phone number is already registered";
    }

    if (!userInformation.birthDate) {
      newErrors.birthDate = "Birth date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerNewUser = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const userURL = `https://backendproject-cn6u.onrender.com/api/v1/users`;

    try {
      const res = await axios.post(userURL, userInformation);
      if (res.status === 200) {
        navigate("/UserLogin");
      }
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 400) {
        const apiErrors = err.response.data.errors || {};
        if (apiErrors.Email) {
          setErrors((prev) => ({ ...prev, email: apiErrors.Email[0] }));
        }
        if (apiErrors.Password) {
          setErrors((prev) => ({ ...prev, password: apiErrors.Password[0] }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h1> Sign Up</h1>
      {loading && <p>Loading...</p>}
      <TextField
        id="username"
        label="Enter your username"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.username}
        helperText={errors.username}
        className="custom-textfield"
      />
      <br />

      <TextField
        id="firstName"
        label="Enter your first name"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.firstName}
        helperText={errors.firstName}
        className="custom-textfield"
      />
      <br />

      <TextField
        id="lastName"
        label="Enter your last name"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.lastName}
        helperText={errors.lastName}
        className="custom-textfield"
      />
      <br />

      <TextField
        id="email"
        label="Enter your email"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.email}
        helperText={errors.email}
        className="custom-textfield"
      />
      <br />

      <TextField
        id="password"
        label="Enter your password"
        type={showPassword ? "text" : "password"}
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.password}
        helperText={errors.password}
        className="custom-textfield"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />

      <TextField
        id="phoneNumber"
        label="Enter your phone number"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.phoneNumber}
        helperText={errors.phoneNumber}
        className="custom-textfield"
      />
      <br />

      <TextField
        id="birthDate"
        label="Enter your birth date (YYYY-MM-DD)"
        variant="standard"
        onChange={onChangeHandler}
        error={!!errors.birthDate}
        helperText={errors.birthDate}
        className="custom-textfield"
      />
      <br />
      <br />
      <Button onClick={registerNewUser} style={{ color: "black" }}>
        Register
      </Button>

      <p>
        Already have an account?
        <Button onClick={() => navigate("/userLogin")}>Log in here</Button>
      </p>
    </div>
  );
}
