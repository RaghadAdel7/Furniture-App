import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";


import "./ProductDetails.css";

export default function ProductDetails({
  product,
  addToFav,
  wishList,
  setWishList,
}) {
//   const { productId } = useParams();
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleWishlistToggle = (product) => {
    if (wishList.some((item) => item.id === product.id)) {
      setWishList(wishList.filter((item) => item.id !== product.id));
      setNotificationMessage("Item removed from wishlist!");
      setAlertSeverity("info");
    } else {
      addToFav(product);
      setNotificationMessage("Item added to wishlist!");
      setAlertSeverity("success");
    }
    setOpen(true);
  };

  if (!product) return <p>No product found.</p>;

  return (
    <div className="product-details" key={product.id}>
      <h1>{product.productName}</h1>
      <p>{product.price} SAR</p>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <button
        onClick={() => handleWishlistToggle(product)}
        className="wishlist-button"
      >
        {wishList.some((item) => item.id === product.id) ? (
          <AddedToWishListIcon style={{ color: "#ad85da" }} />
        ) : (
          <WishListIcon />
        )}
      </button>
      <Link to="/products">
        <Button> Go back</Button>
      </Link>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        className="snackbar"
      >
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>
      <Rating name="read-controlled" value={product.rating.rate} readOnly />
    </div>
  );
}
