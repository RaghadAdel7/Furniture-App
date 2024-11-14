import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ProductDetails from "../components/productDetails/ProductDetails"; // Adjust the path based on your folder structure

export default function ProductDetailsPage({
  wishList,
  setWishList,
  addToFav,
  addToCart,
  addItemToCart,
}) {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productDetailsURL = `http://localhost:5125/api/v1/products/${productId}`;

  function fetchProductDetails() {
    axios
      .get(productDetailsURL)
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError("Error fetching product details");
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

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
        We are fetching product details
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ProductDetails
        product={productDetails}
        wishList={wishList}
        setWishList={setWishList}
        addToFav={addToFav}
        addToCart={addToCart}
        addItemToCart={addItemToCart}
      />
    </div>
  );
}