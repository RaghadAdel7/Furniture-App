import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import "./OrderHistory.css";

export default function OrderHistory({ userData }) {
  const [orderList, setOrderList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userData || !userData.userId) return;

    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/orders/user/${userData.userId}`;

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

  if (isLoading) return <div>Loading order history...</div>;

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
