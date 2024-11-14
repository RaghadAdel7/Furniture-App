import React, { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails({
  product,
  addToFav,
  wishList,
  setWishList,
  addToCart,
}) {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

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

   const handleAddToCart = (product) => {
     addToCart(product);
     setNotificationMessage("Item added to cart!");
     setAlertSeverity("success");
     setOpen(true);
   };

  return (
    <div className="product-details" key={product.productId}>
      <h1>{product.productName}</h1>
      <p>{product.description}</p>
      <img
        src={product.productImage || "default-image.jpg"}
        alt={product.productName}
      />
      <p>
        <strong>{product.productPrice} SAR</strong>
      </p>

      <div className="action-buttons">
        <button
          onClick={() => handleWishlistToggle(product)}
          className="wishlist-button2"
        >
          {wishList.some((item) => item.productId === product.productId) ? (
            <AddedToWishListIcon />
          ) : (
            <WishListIcon />
          )}
        </button>

        <div
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          <AddShoppingCartIcon />
          <span>Add to cart</span>
        </div>
      </div>

      <Link to="/products" className="go-back-link">
        <ArrowBackIosIcon />
        <Button>Go back</Button>
      </Link>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertSeverity}
          className="snackbar-alert"
        >
          {notificationMessage}
        </Alert>
      </Snackbar>

      <Rating name="read-only" value={product.averageRating} readOnly />
    </div>
  );
}
