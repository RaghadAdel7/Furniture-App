import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import anonymousIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import logo from "./logo.png";
import registeredUser from "./personal.jpeg";

import "./NavBar.css";

export default function NavBar (prop) {
      const { wishList, categories, isAuthenticated, userData } = prop;


      const arrayLength = wishList.length;
    return (
      <header>
        <div className="header-logo">
          <img src={logo} alt="e-commerce logo" />
        </div>

        <div className="NavBar-container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
          <div className="cart-wishlist-container">
            <li>
              <Link to="/wishlist">
                <Badge
                  badgeContent={arrayLength}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                />
                <WishListIcon />
              </Link>
            </li>
            <li>
              <Link to="/cart" className="icon">
                <ShoppingCartIcon />
              </Link>
            </li>
            {/* <li>
              <Link to="/UserLogin">Sign In</Link>
            </li> */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Avatar alt="registered user icon" src={registeredUser} />
              </Link>
            ) : (
              <Link to="/userLogin">
                <Avatar alt="unknown user icon" src={anonymousIcon} />
              </Link>
            )}

            {isAuthenticated && userData && userData.role === "Admin" ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <p style={{ display: "none" }}>Dashboard</p>
            )}
          </div>
        </div>
      </header>
    );
}