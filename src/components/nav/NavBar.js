import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import logo from "./appLogo.png";
import Face3Icon from "@mui/icons-material/Face3";
// import Categories from "../category/Categories";
// import Subcategories from "../category/SubCategories";
import "./NavBar.css";
import CategoriesDropdown from "./CategoriesDropdown";

export default function NavBar (prop) { 
  const { wishList, isAuthenticated, userData } = prop;
  const arrayLength = wishList.length;
  console.log("isAuthenticated:", isAuthenticated);
  console.log("userData:", userData);
  console.log("User Role:", userData ? userData.role : "No Role");

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
              <CategoriesDropdown />
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              {isAuthenticated && userData && userData.role === "Admin" ? (
                <Link to="/dashboard">Dashboard</Link>
              ) : (
                <p style={{ display: "none" }}>Dashboard</p>
              )}
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
            {isAuthenticated ? (
              <Link to="/profile">
                <Avatar alt="registered user icon" src={Face3Icon} />
              </Link>
            ) : (
              <Link to="/userLogin">
                <Avatar src={PersonIcon} />
              </Link>
            )}
          </div>
        </div>
      </header>
    );
}
