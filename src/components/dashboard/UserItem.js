import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import "./UsersDashboard.css";

export default function UserItem(prop) {
  const { user, fetchUserList } = prop;

  function deleteUser() {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://backendproject-cn6u.onrender.com/api/v1/users/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("A user is deleted");
          fetchUserList();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <Button color="error" onClick={deleteUser}>
      Delete
    </Button>
  );
}
