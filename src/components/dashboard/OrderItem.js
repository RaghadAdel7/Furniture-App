import React from "react";
import { Button } from "@mui/material";
import axios from "axios";
import "./OrdersDashboard.css";

export default function OrderItem({ cart, fetchCarts }) {
  if (!cart) {
    return <div>No orders data available.</div>;
  }
  function deleteOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, redirecting to login.");
      return;
    }

    axios
      .delete(
        `https://e-commerce-backend-project-1.onrender.com/api/v1/carts/${cart.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Order deleted successfully");
          fetchCarts();
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <tr>
      <td>{cart.id}</td>
      <td>{cart.userId}</td>
      <td>{cart.cartQuantity || "N/A"}</td>
      <td>{cart.totalPrice || "N/A"}</td>
      <td>{cart.status || "Pending"}</td>
      <td>
        <Button color="error" onClick={deleteOrder} className="delete-btn">
          Delete Order
        </Button>
      </td>
    </tr>
  );
}
