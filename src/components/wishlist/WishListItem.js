import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./WishList.css";

export default function WishListItem({ item, onDelete }) {
  return (
    <div className="wishlist-item">
      <img src={item.productImage} alt={item.productName} className="item-image" />
      <div className="item-details">
        <p className="item-title">{item.productName}</p>
        <p className="item-price">{item.productPrice} SAR</p>
        
        <button onClick={() => onDelete(item.productId)} className="delete-button">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
