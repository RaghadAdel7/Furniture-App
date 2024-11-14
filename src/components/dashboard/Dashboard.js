import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Welcome to Your Dashboard</h2>
      <p className="dashboard-description">
        Here you can manage Products, Users, and Orders. Select one of the
        options below to proceed.
      </p>
      <div className="dashboard-links">
        <Link to="/productsDashboard" className="dashboard-link">
          <span className="link-text">Manage Products</span>
        </Link>
        <Link to="/usersDashboard" className="dashboard-link">
          <span className="link-text">Manage Users</span>
        </Link>
        <Link to="/ordersDashboard" className="dashboard-link">
          <span className="link-text">Manage Orders</span>
        </Link>
      </div>
    </div>
  );
}
