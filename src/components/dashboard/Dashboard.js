import React from 'react'
import { Link } from "react-router-dom";
import ProductsDashboard from "./ProductsDashboard";

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/productsDashboard"> Products</Link>
    </div>
  );
}
