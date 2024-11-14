import { CircularProgress } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  isUserDataLoading,
  isAuthenticated,
  element,
  userData,
  adminRole,
}) {
  if (isUserDataLoading) {
return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
      textAlign: "center",
    }}
  >
    <CircularProgress color="inherit" />
    Loading Data..
  </div>
);  }

  // If adminRole is required, check if user is authenticated and has an Admin role
  if (adminRole) {
    if (isAuthenticated && userData?.role === "Admin") {
      return element; // Allow access to the route
    }
    return <Navigate to="/UserLogin" />; // Redirect if not Admin or not authenticated
  }

  // For non-admin routes, just check if the user is authenticated
  return isAuthenticated ? element : <Navigate to="/UserLogin" />;
}
