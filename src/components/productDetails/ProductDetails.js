import React, { useState } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./ProductDetails.css";

export default function ProductDetails({
  product,
  addToFav,
  wishList,
  setWishList,
  cartList,
  setCartList,
  addToCart
  // addToCart, // Receive the addToCart function here
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
//  const addToCart = (product) => {
//    // Check if the product already exists in the cart
//    const productExists = cartList.some((item) => item.id === product.id);

//    if (!productExists) {
//      // If not, add it to the cart with a default quantity of 1
//      setCartList([...cartList, { ...product, quantity: 1 }]);
//      console.log("Product added to cart:", product);
//    } else {
//      // Optional: if the product is already in the cart, you can increase the quantity
//      const updatedCart = cartList.map((item) =>
//        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//      );
//      setCartList(updatedCart);
//      console.log("Product quantity updated:", updatedCart);
//    }
//  };
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

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="product-details" key={product.productId}>
      <h1>{product.productName}</h1>
      <p>{product.productPrice} SAR</p>
      <p>{product.description}</p>
      <Button onClick={() => addToCart(product)}> Add to cart </Button>
      
      <Link to={`${product.id}`}>
        <ArrowForwardIosIcon />
      </Link>
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
      <Link to="/products">
        <Button> Go back</Button>
      </Link>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>
      <Rating name="read-controlled" value={product.rating?.rate} readOnly />
      <AddShoppingCartIcon
        onClick={() => addToCart(product)}
        sx={{
          cursor: "pointer",
        }}
      />
    </div>
  );
}
