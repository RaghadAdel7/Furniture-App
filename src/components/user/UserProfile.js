import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { TextField, Snackbar } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Face3Icon from "@mui/icons-material/Face3";
import "./UserForm.css";

export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleUsernameChange = (event) => setNewUsername(event.target.value);
  const handleSnackbarClose = () => setOpenSnackbar(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [newUsername, setNewUsername] = useState("");
  function onChangeHandlerUsername(event) {
    setNewUsername(event.target.value);
  }

  function updateUserProfile() {
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://sda-3-online-fe-repo-ykt5.onrender.comapi/v1/users/${userData.userId}`,
        {
          username: newUsername,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (
          res.status === 400 &&
          res.data.message === "Username already taken"
        ) {
          setError("Username already taken. Please choose another one.");
        } else {
          setUserData(res.data);
          setSuccess("Username updated successfully!");
          setOpenSnackbar(true);
          setAnchorEl(null);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          if (error.response.status === 400) {
            alert("Username already taken. Please choose another one.");
          } else {
            alert("Failed to update profile. Please try again.");
          }
        } else {
          alert("An error occurred while updating the profile.");
        }
      });
  }

  function logOutHandler() {
    localStorage.removeItem("token");
    setUserData(null);
  }

  return (
    <div className="profile-container">
      <h1 className="profile-header">Profile</h1>
      <div className="profile-avatar">
        <Avatar sx={{ width: 80, height: 80 }}>
          {userData.profilePicture ? (
            <img src={userData.profilePicture} alt="Profile" />
          ) : (
            <Face3Icon fontSize="large" />
          )}
        </Avatar>
      </div>
      <div className="profile-info">
        <h4>Email: {userData.email}</h4>
        <h4>Username: {userData.username}</h4>
        <h4>Role: {userData.role}</h4>
      </div>
      <div className="button-container">
        {/* <Button variant="text">
          <Link to="/orders" className="link-button">
            Order History
          </Link>
        </Button> */}
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          startIcon={<EditIcon />}
        ></Button>
        <Button
          variant="contained"
          onClick={logOutHandler}
          startIcon={<LogoutIcon />}
        ></Button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-content">
          <TextField
            id="username"
            label="Username"
            variant="standard"
            helperText="Please enter your new username"
            onChange={onChangeHandlerUsername}
          />
          <Button onClick={updateUserProfile}> Save Changes</Button>
        </div>
      </Popover>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={success}
      />
    </div>
  );
}
