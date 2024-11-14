import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import { CircularProgress } from "@mui/material";
import "./OrdersDashboard.css";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch orders
  function fetchCarts() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, redirecting to login.");
      return;
    }

    axios
      .get("http://localhost:5125/api/v1/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to fetch orders.");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCarts();
  }, []);

if (loading) {
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
      We are fetching orders ..
    </div>
  );
}

  if (error) {
    return (
      <div className="error-container">
        <img src="/error-image.png" alt="Error" className="error-image" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="orders-dashboard">
      <h1>Orders Dashboard</h1>
      <div className="orders-table-container">
        {orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer ID</th>
                <th>Cart Quantity</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((cart) => (
                <OrderItem key={cart.id} cart={cart} fetchCarts={fetchCarts} />
              ))}
            </tbody>
          </table>
        ) : (
          <div>No orders available.</div>
        )}
      </div>
    </div>
  );
}
