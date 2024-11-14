import React, {useState} from "react";
import WishListItem from "./WishListItem";
import { Snackbar, Alert } from "@mui/material";
import "./WishList.css";

export default function WishList({ wishList, setWishList,addToCart }) {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setWishList(wishList.filter((item) => item.productId !== id));
    setNotificationMessage("Item removed from wishlist!");
    setAlertSeverity("info");
    setOpen(true);
  };
  const handleMoveToCart = (item) => {
    setWishList(
      wishList.filter((product) => product.productId !== item.id)
    );
    addToCart(item);
    setNotificationMessage("Item moved to cart!");
    setAlertSeverity("success");
    setOpen(true);
  };
  if (wishList.length === 0) {
    return <p className="empty-message">Your wishlist is empty.</p>;
  }

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <div className="wishlist-items">
        {wishList.map((item) => (
          <WishListItem
            key={item.productId}
            item={item}
            onDelete={handleDelete}
            onMoveToCart={handleMoveToCart}
          />
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
