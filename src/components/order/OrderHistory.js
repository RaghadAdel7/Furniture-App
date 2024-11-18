import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import { CircularProgress } from "@mui/material";

export default function OrderHistory({ userData }) {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData.userId) return;

    const token = localStorage.getItem("token");
    const url = `https://e-commerce-backend-project-1.onrender.com/api/v1/orders/user/${userData.userId}/ordershistory`;

    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrderList(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setIsLoading(false);
      });
  }, [userData]);

  if (isLoading) {
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
  return (
    <div className="orderListContainer">
      <h1>Order History</h1>
      {orderList.length > 0 ? (
        orderList.map((order) => <OrderItem key={order.id} order={order} />)
      ) : (
        <div>No order history</div>
      )}
    </div>
  );
}
