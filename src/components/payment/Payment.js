// import React, { useState } from "react";
// import axios from "axios";

// export default function Checkout({ cartId, totalPrice, couponId }) {
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState(null);
//   const [orderId, setOrderId] = useState(null);
//   const token = localStorage.getItem("token");

// // Function to initiate a payment
// async function initiatePayment(paymentDetails) {
//   try {
//     const response = await axios.post("/api/v1/payments", paymentDetails, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Payment initiation failed:", error);
//     throw error;
//   }
// }




// import React from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Payment({ orderId, totalAmount }) {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   // Simulated payment method (replace with actual payment gateway)
//   function processPayment() {
//     const paymentData = {
//       OrderId: orderId,         // Order ID that the user wants to pay for
//       Amount: totalAmount,      // Total amount of the order
//       PaymentMethod: "CreditCard", // Example payment method (could be dynamic)
//     };

//     const paymentUrl = "http://localhost:5125/api/v1/payments"; // Payment endpoint

//     axios
//       .post(paymentUrl, paymentData, {
//         headers: { Authorization: `Bearer ${token}` }, // Use token for authentication
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           alert("Payment successful!");
//           navigate(`/order/${orderId}`); // Navigate to the order details page
//         }
//       })
//       .catch((error) => {
//         console.error("Payment Error:", error);
//         alert("Payment processing failed. Please try again.");
//       });
//   }

//   return (
//     <div>
//       <h2>Payment Page</h2>
//       <p>Total Amount: {totalAmount} SAR</p>
//       <button onClick={processPayment}>Proceed with Payment</button>
//     </div>
//   );
// }
