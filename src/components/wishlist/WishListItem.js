import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./WishList.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function WishListItem({ item, onDelete, onMoveToCart }) {
  return (
    <div className="wishlist-item">
      <img
        src={item.productImage}
        alt={item.productName}
        className="item-image"
      />
      <div className="item-details">
        <p className="item-title">{item.productName}</p>
        <p className="item-price">{item.productPrice} SAR</p>
        <button
          onClick={() => onDelete(item.productId)}
          className="delete-button"
        >
          <DeleteIcon />
        </button>
        <button
          className="move-to-cart-button"
          variant="outlined"
          color="primary"
          onClick={() => onMoveToCart(item)}
        >
          <span className="add-to-cart-icon"></span>
          <AddShoppingCartIcon className="cart-icon" />
        </button>
      </div>
    </div>
  );
}
