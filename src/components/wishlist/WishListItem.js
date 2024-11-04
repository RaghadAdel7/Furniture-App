import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./WishList.css";

export default function WishListItem({ item, onDelete }) {
  return (
    <div className="wishlist-item">
      <img src={item.image} alt={item.title} className="item-image" />
      <div className="item-details">
        <p className="item-title">{item.title}</p>
        <p className="item-price">{item.price} SAR</p>
        <button onClick={() => onDelete(item.id)} className="delete-button">
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}
