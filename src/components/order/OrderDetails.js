import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function OrderDetails({ item }) {
  return (
    <Card sx={{ marginTop: "10px" }}>
      <CardContent>
        <Typography>Product Name: {item.productName}</Typography>
        <Typography>Quantity: {item.quantity}</Typography>
        <Typography>Subtotal: {item.subtotal} SAR</Typography>
      </CardContent>
    </Card>
  );
}
