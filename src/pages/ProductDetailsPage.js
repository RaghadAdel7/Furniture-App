import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ProductDetails from "../components/productDetails/ProductDetails"; // Adjust the path based on your folder structure

export default function ProductDetailsPage({
  wishList,
  setWishList,
  addToFav,
}) {
  const { productId } = useParams();
//   const url = `https://fakestoreapi.com/products/${productId}`;
  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productDetailsURL = `http://localhost:5125/api/v1/products/${productId}`;

  function fetchProductDetails() {
    axios
      .get(productDetailsURL)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError("Error");
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);


  if (loading) {
    return (
      <div className="progress">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return (
      <p>
        {error}
      </p>
    );
  }

  return (
    <div>
      <ProductDetails
        product={product}
        wishList={wishList}
        setWishList={setWishList}
        addToFav={addToFav}
      />
    </div>
  );
}