import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import "./Cart.css";

export default function CartItem({ cart, cartList, setCartList }) {
  const increaseProductQuantity = (productId) => {
    setCartList(
      cartList.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseProductQuantity = (productId) => {
    setCartList(
      cartList.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeProduct = (productId) => {
    setCartList(cartList.filter((item) => item.productId !== productId));
  };

  return (
    <Paper className="cart-item">
      <Typography variant="h6">{cart.productName}</Typography>
      <Typography>Price: {cart.productPrice} SAR</Typography>
      <div className="cart-item-controls">
        <Button
          variant="outlined"
          onClick={() => decreaseProductQuantity(cart.productId)}
        >
          -
        </Button>
        <Typography className="quantity">{cart.quantity}</Typography>
        <Button
          variant="outlined"
          onClick={() => increaseProductQuantity(cart.productId)}
        >
          +
        </Button>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => removeProduct(cart.productId)}
      >
        Delete
      </Button>
    </Paper>
  );
}
