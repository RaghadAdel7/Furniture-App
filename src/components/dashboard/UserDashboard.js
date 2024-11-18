import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import UserItem from "./UserItem";
import "./UsersDashboard.css";

export default function UserDashBoard(UserData) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function fetchUserList() {
    const token = localStorage.getItem("token");
    axios
      .get("https://e-commerce-backend-project-1.onrender.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <img src="/error-image.png" alt="Error" className="error-image" />
        <p>{error}</p>
      </div>
    );
  }
  console.log("UserList", userList);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="dashboard-title">Users Dashboard</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">
                <strong>ID</strong>
              </TableCell>
              <TableCell className="table-header">
                <strong>Username</strong>
              </TableCell>
              <TableCell className="table-header">
                <strong>Email</strong>
              </TableCell>
              <TableCell className="table-header">
                <strong>Role</strong>
              </TableCell>
              <TableCell className="table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="table-row">{user.userId}</TableCell>
                <TableCell className="table-row">{user.username}</TableCell>

                <TableCell className="table-row">{user.email}</TableCell>
                <TableCell className="table-row">{user.role}</TableCell>
                <TableCell>
                  <UserItem user={user} fetchUserList={fetchUserList} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
