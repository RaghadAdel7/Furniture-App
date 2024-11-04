import React, { useState } from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";

export default function UserProfile(prop) {
    const { userData, setUserData } = prop;
    // console.log("from profile component",userData);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

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
          `http://localhost:5125/api/v1/users/${userData.userId}`,
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
          setUserData(res.data);
          setAnchorEl(null);
        })
        .catch((error) => console.log(error));
    }

     function logOutHandler() {
       localStorage.removeItem("token");
       setUserData(null);
     }

  return (
    <div>
      <h1>User Profile</h1>
      <h4>Email: {userData.email}</h4>
      <h4>Username: {userData.username}</h4>
      <h4>Role: {userData.role}</h4>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Edit
      </Button>
      <Button variant="contained" onClick={logOutHandler}>
        Log out
      </Button>
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
        <TextField
          id="username"
          label="Username"
          variant="standard"
          helperText="Please enter your new username"
          onChange={onChangeHandlerUsername}
        />
        <Button onClick={updateUserProfile}> Edit </Button>
      </Popover>
    </div>
  );
}
