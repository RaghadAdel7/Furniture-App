import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import { Snackbar, Alert, Button } from "@mui/material";
import ProductsPagination from "./ProductsPagination";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import "./Products.css";

export default function Products({
  productList,
  wishList,
  setWishList,
  addToFav,
  totalCount,
  page,
  handleChange,
  addToCart,
}) {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [cartList, setCartList] = useState([]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
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

  if (productList.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <div className="products-container">
        {productList.map((product) => (
          <div className="products" key={product.productId}>
            <p className="product-name">{product.productName}</p>

            <div className="rating">
              <Rating
                className="read-controlled"
                value={product.averageRating}
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

            <Link
              to={`/products/${product.productId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={product.productImage || "default-image.jpg"}
                alt={product.productName}
              />
              <p className="product-price">{product.productPrice} SAR</p>
            </Link>

            <div
              className="add-to-cart-container"
              onClick={() => handleAddToCart(product)}
            >
              <span className="add-to-cart-text"> </span>
              <AddShoppingCartIcon sx={{ cursor: "pointer" }} />
            </div>
          </div>
        ))}
      </div>

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

