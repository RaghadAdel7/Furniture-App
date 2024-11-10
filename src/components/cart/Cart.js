import React from "react";
import axios from "axios";
import { Button, Typography, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart({ cartList, setCartList, userData }) {
  const navigate = useNavigate();

  if (cartList.length === 0) {
    return (
      <div className="cart-empty">
        <Typography variant="h5">Your Cart is Empty</Typography>
        <Button variant="contained" color="primary">
          <Link to="/products" className="link">
            Check out newest collection
          </Link>
        </Button>
      </div>
    );
  }

  const totalPrice = cartList.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  const token = localStorage.getItem("token");

  function checkOut() {
    if (!userData) {
      alert("Please log in to checkout");
      navigate("/userLogin");
      return;
    }

const cartData = {
  UserId: userData.userId, // Include UserId here
  CartDetails: cartList
    .filter((item) => item.productId) // Ensure productId exists
    .map((item) => ({
      CartDetailsId: item.cartDetailsId,
      ProductId: item.productId,
      CartId: item.cartId,
      Quantity: item.quantity,
      Subtotal: item.quantity * item.productPrice,
    })),
  CartQuantity: cartList.reduce((acc, item) => acc + item.quantity, 0),
  TotalPrice: totalPrice,
};

    const orderUrl = "http://localhost:5125/api/v1/carts";

    axios
      .post(orderUrl, cartData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Response:", res);
        if (res.status === 200) {
          alert("Order created successfully!");
          navigate("/products");
          setCartList([]); // Clear cart after successful order
        }
      })
      .catch((error) => {
        console.error("Checkout Error:", error);
        console.error("Error Response Data:", error.response.data);
        alert("An error occurred during checkout. Please try again.");
      });
  }

  return (
    <div className="cart-container">
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartList.map((cart) => (
        <CartItem
          key={cart.id}
          cart={cart}
          cartList={cartList}
          setCartList={setCartList}
        />
      ))}
      <Divider />
      <div className="cart-total">
        <Typography variant="h6">Total Price: {totalPrice} SAR</Typography>
        <Button variant="contained" color="primary" onClick={checkOut}>
          Checkout
        </Button>
      </div>
    </div>
  );
}
