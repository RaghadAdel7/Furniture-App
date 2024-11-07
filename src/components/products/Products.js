import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import { Snackbar, Alert, Button } from "@mui/material";
import ProductsPagination from "./ProductsPagination";

import "./Products.css";

export default function Products({
  productList,
  wishList,
  setWishList,
  addToFav,
  totalCount,
  page,
  handleChange,
}) {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Wishlist toggle function
  const handleWishlistToggle = (product) => {
    if (wishList.some((item) => item.productId === product.productId)) {
      setWishList(
        wishList.filter((item) => item.productId !== product.productId)
      );
      setNotificationMessage("Item removed from wishlist!");
      setAlertSeverity("info");
    } else {
      addToFav(product);
      setNotificationMessage("Item added to wishlist!");
      setAlertSeverity("success");
    }
    setOpen(true);
  };

  return (
    <div className="products-container">
      {productList.length === 0 ? (
        <p>No products found.</p>
      ) : (
        productList.map((product) => (
          <div className="products" key={product.productId}>
            <p>{product.productName}</p>
            <p>{product.productPrice} SAR</p>
            <Link
              to={`/products/${product.productId}`}
              className="details-button"
            >
              <button>View Details</button>
            </Link>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              <Rating
                className="read-controlled"
                value={product.rating?.rate}
                readOnly
              />
            </div>

            <button
              onClick={() => handleWishlistToggle(product)}
              className="wishlist-button"
            >
              {wishList.some((item) => item.productId === product.productId) ? (
                <AddedToWishListIcon style={{ color: "#ad85da" }} />
              ) : (
                <WishListIcon />
              )}
            </button>
          </div>
        ))
      )}

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      <ProductsPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}