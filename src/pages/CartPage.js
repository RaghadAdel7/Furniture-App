import React, { useState, useEffect } from "react";
import Cart from "../components/cart/Cart";
import CircularProgress from "@mui/material/CircularProgress";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (Math.random() < 0.5) {
        setError("Failed to load cart items.");
      }
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="progress">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Cart />
    </div>
  );
}
