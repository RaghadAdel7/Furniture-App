// I will try to integrate this LATER


// src/components/payment/PaymentPage.js

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, Typography, TextField, Divider } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function PaymentPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get cart data passed from Cart page
//   const { cartData } = location.state || {}; // Ensure cartData exists

//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [totalPrice, setTotalPrice] = useState(cartData?.TotalPrice || 0);

//   const handlePaymentSubmit = () => {
//     const paymentData = {
//       PaymentMethod: paymentMethod,
//       PaymentDate: new Date().toISOString(),
//       PaymentStatus: true, // Assume success for example
//       TotalPrice: totalPrice,
//       CartId: cartData?.CartId, // Attach the cart ID or cart details
//     };

//     const token = localStorage.getItem("token");

//     axios
//       .post("http://localhost:5125/api/v1/payments", paymentData, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         alert("Payment successful!");
//         navigate("/order-confirmation", { state: { order: response.data } });
//       })
//       .catch((error) => {
//         console.error("Payment Error:", error);
//         alert("An error occurred during payment. Please try again.");
//       });
//   };

//   return (
//     <div className="payment-page">
//       <Typography variant="h4" gutterBottom>
//         Payment Details
//       </Typography>
//       <Divider />

//       <div className="order-summary">
//         <Typography variant="h6">Order Summary</Typography>
//         <Typography>Total Price: {totalPrice} SAR</Typography>
//         {/* Optionally display more cartData details here */}
//       </div>

//       <TextField
//         label="Payment Method"
//         value={paymentMethod}
//         onChange={(e) => setPaymentMethod(e.target.value)}
//         fullWidth
//         margin="normal"
//       />

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handlePaymentSubmit}
//         style={{ marginTop: "20px" }}
//       >
//         Submit Payment
//       </Button>
//     </div>
//   );
// }

// function PaymentPage() {
//   const { state } = useLocation();
//   const cartData = state?.cartData;

//   // Handle the payment process here using cartData
//   // For example, show the total price, user details, etc.
//   return (
//     <div>
//       <h3>Payment Summary</h3>
//       <div>Total Price: {cartData.TotalPrice} SAR</div>
//       {/* Proceed with payment process */}
//     </div>
//   );
// }
