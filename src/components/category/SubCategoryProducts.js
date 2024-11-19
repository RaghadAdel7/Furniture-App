import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Snackbar,
  Alert,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import WishListIcon from "@mui/icons-material/FavoriteBorder";
import AddedToWishListIcon from "@mui/icons-material/FavoriteOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Link, useParams } from "react-router-dom";
import "./SubCategoryProducts.css";

const SubCategoryProducts = ({
  wishList = [],
  setWishList = () => {},
  addToFav,
  addToCart,
}) => {
  const { subCategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://sda-3-online-fe-repo-ykt5.onrender.comapi/v1/subcategories/${subCategoryId}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [subCategoryId]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearchTerm = searchTerm
        ? product.productName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesMinPrice = minPrice
        ? product.productPrice >= minPrice
        : true;
      const matchesMaxPrice = maxPrice
        ? product.productPrice <= maxPrice
        : true;
      return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.productPrice - b.productPrice;
      if (sortOrder === "desc") return b.productPrice - a.productPrice;
      if (sortOrder === "latest")
        return new Date(b.addedDate) - new Date(a.addedDate);
      return 0;
    });

  const indexOfLastProduct = page * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotificationMessage("Item added to cart!");
    setAlertSeverity("success");
    setOpen(true);
  };

  const handleSortMenuOpen = (event) => setAnchorEl(event.currentTarget);

  const handleSortMenuClose = () => setAnchorEl(null);

  const handleSortSelection = (order) => {
    setSortOrder(order);
    setAnchorEl(null);
  };

  const toggleFilterVisibility = () => {
    setShowFilter((prev) => !prev);
  };
  return (
    <div>
      <h1>Products</h1>

      <div className="search-wrapper">
        <div className="search-container">
          <TextField
            label="Search products..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="products-search"
          />

          <div className="control-right">
            <IconButton
              onClick={handleSortMenuOpen}
              style={{ fontSize: "large", color: "black" }}
            >
              <SortIcon /> Sort
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleSortMenuClose}
            >
              <MenuItem onClick={() => handleSortSelection("latest")}>
                Latest Arrivals
              </MenuItem>
              <MenuItem onClick={() => handleSortSelection("asc")}>
                Price: Low to High
              </MenuItem>
              <MenuItem onClick={() => handleSortSelection("desc")}>
                Price: High to Low
              </MenuItem>
            </Menu>

            <IconButton
              onClick={toggleFilterVisibility}
              style={{ fontSize: "large", color: "black" }}
            >
              <FilterAltIcon /> Filter
            </IconButton>
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="filter-wrapper">
          <TextField
            label="Min Price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="SAR"
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Max Price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            variant="outlined"
            size="small"
            placeholder="SAR"
          />
        </div>
      )}

      <div className="products-container">
        {currentProducts.length === 0 ? (
          <p>No products found for this subcategory.</p>
        ) : (
          currentProducts.map((product) => (
            <div className="products" key={product.productId}>
              <p className="product-name">{product.productName}</p>
              <div className="rating">
                <Rating
                  className="read-controlled"
                  value={product.averageRating}
                  readOnly
                />
              </div>
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
              <button
                onClick={() => handleWishlistToggle(product)}
                className="wishlist-button"
              >
                {wishList.some(
                  (item) => item.productId === product.productId
                ) ? (
                  <AddedToWishListIcon style={{ color: "#ad85da" }} />
                ) : (
                  <WishListIcon />
                )}
              </button>
              <div
                className="add-to-cart-container"
                onClick={() => handleAddToCart(product)}
              >
                <AddShoppingCartIcon sx={{ cursor: "pointer" }} />
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        shape="rounded"
      />

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubCategoryProducts;
