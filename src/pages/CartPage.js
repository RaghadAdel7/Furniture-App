
import React, {useState} from "react";
import Cart from "../components/cart/Cart";
import { CircularProgress } from "@mui/material";
// import Payment from "../components/payment/Payment"
export default function CartPage(prop) {
  const { cartList, setCartList, userData } = prop;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (error) {
    return (
      <div className="error-container">
        <img src="/error-image.png" alt="Error" className="error-image" />
        <p>{error}</p>
      </div>
    );
  }
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
      </div>
    );
  }
  return (
    <div>
      <Cart
        cartList={cartList}
        setCartList={setCartList}
        userData={userData}
      />
      {/* <Payment/> */}
    </div>
  );
}