import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import { Snackbar, Alert, Button } from "@mui/material";
import ProductsPagination from "./ProductsPagination";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import "./Products.css";
import ProductDetails from "../productDetails/ProductDetails";

export default function Products({
  productList,
  wishList,
  setWishList,
  addToFav,
  totalCount,
  page,
  handleChange,
  addToCart
}) {
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  // Lift the cart state up to the Products component
  const [cartList, setCartList] = useState([]);

  // Function to handle adding product to the cart
  // const addToCart = (product) => {
  //   const productExists = cartList.some((item) => item.id === product.id);

  //   if (!productExists) {
  //     // If the product doesn't exist in the cart, add it with quantity 1
  //     setCartList([...cartList, { ...product, quantity: 1 }]);
  //   } else {
  //     // If the product already exists in the cart, just update the quantity
  //     const updatedCart = cartList.map((item) =>
  //       item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //     );
  //     setCartList(updatedCart);
  //   }

  //   // Log the updated cart to the console
    // console.log("Updated Cart:", [...cartList, { ...product, quantity: 1 }]);
  // };

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
  
  return (
    <div className="products-container">
      {productList.length === 0 ? (
        <p>No products found.</p>
      ) : (
        productList.map((product) => (
          <div className="products" key={product.productId}>
            <p>{product.productName}</p>
            <p>{product.productPrice} SAR</p>
            <img src={product.productImage} alt={product.productName} />
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
            {/* Add to Cart Button */}
            <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            <AddShoppingCartIcon
              onClick={() => addToCart(product)}
              sx={{
                cursor: "pointer",
              }}
            />
          </div>
        ))
      )}

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>

      {productList.map((product) => (
        <ProductDetails
          key={product.productId}
          product={product}
          wishList={wishList}
          setWishList={setWishList}
          addToFav={addToFav}
          cartList={cartList}
          setCartList={setCartList}
          addToCart={addToCart} // Pass addToCart to ProductDetails
        />
      ))}

      <ProductsPagination
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}
