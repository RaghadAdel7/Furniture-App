import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";
import Products from "../components/products/Products";
import Categories from "../components/category/Categories";
import Subcategories from "../components/category/SubCategories";

export default function ProductsPage({
  productList,
  categories,
  wishList,
  setWishList,
  addToFav,
  loading,
  error,
  totalCount,
  page,
  handleChange, // Pagination
  userInputHandler, // Search input handler
  setMinPrice,
  setMaxPrice,
  userInput,
}) {
  // States
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [minPrice, setMinPriceState] = useState("");
  const [maxPrice, setMaxPriceState] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);

  const getFilteredProducts = () => {
    return productList.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory.name
        : true;
      const matchesSubcategory = selectedSubcategory
        ? product.subcategory === selectedSubcategory.name
        : true;
      const matchesMinPrice = minPrice
        ? product.productPrice >= minPrice
        : true;
      const matchesMaxPrice = maxPrice
        ? product.productPrice <= maxPrice
        : true;
      return (
        matchesCategory &&
        matchesSubcategory &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  };

  const getHighestPriceProduct = (filteredProducts) => {
    if (filteredProducts.length === 0) return null;
    return filteredProducts.reduce(
      (max, product) =>
        product.productPrice > max.productPrice ? product : max,
      filteredProducts[0]
    );
  };

  // Filtered products based on category, subcategory, and price
  const filteredProducts = getFilteredProducts();

  // Get the highest-priced product from the filtered list
  const highestPricedProduct = getHighestPriceProduct(filteredProducts);

  // Sort filtered products based on the selected order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.productPrice - b.productPrice; // Low to High
    } else {
      return b.productPrice - a.productPrice; // High to Low
    }
  });

  // Remove the highest-priced product from the list and display it separately
  const remainingProducts = sortedProducts.filter(
    (product) => product.productId !== highestPricedProduct?.productId
  );

  // Combine the highest-priced product at the top with the sorted rest of the products
  const finalProductList = highestPricedProduct
    ? [highestPricedProduct, ...remainingProducts]
    : sortedProducts;

  // Sort Menu Handlers
  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing of the sorting menu
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle sort selection
  const handleSortSelection = (order) => {
    setSortOrder(order);
    setAnchorEl(null); // Close the menu after selection
  };

  // Toggle price filter visibility
  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  if (loading) {
    return (
      <div className="progress">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Products</h1>

      {/* Categories Filter */}
      <Categories
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Subcategories Filter */}
      {selectedCategory && (
        <Subcategories
          subcategories={selectedCategory.subcategories}
          setSelectedSubcategory={setSelectedSubcategory}
        />
      )}

      {/* Search Bar */}
      <div className="search-wrapper">
        <TextField
          id="search"
          label="Search products..."
          variant="outlined"
          value={userInput}
          onChange={userInputHandler}
          fullWidth
        />
      </div>

      {/* Sort Button with Icon */}
      <div className="filterSort-container">
        <div>
          <IconButton
            onClick={handleSortMenuOpen}
            style={{ fontSize: "large", color: "black" }}
          >
            <SortIcon />
            Sort
          </IconButton>

          {/* Sorting Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleSortMenuClose}
          >
            <MenuItem onClick={() => handleSortSelection("asc")}>
              Sort by Price: Low to High <ArrowUpwardIcon />
            </MenuItem>
            <MenuItem onClick={() => handleSortSelection("desc")}>
              Sort by Price: High to Low <ArrowDownwardIcon />
            </MenuItem>
          </Menu>
        </div>

        {/* Filter Icon and Price Filter Inputs */}
        <IconButton
          onClick={togglePriceFilter}
          style={{ fontSize: "large", color: "black" }}
        >
          <FilterAltIcon />
          Filter
        </IconButton>

        {showPriceFilter && (
          <>
            <TextField
              label="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPriceState(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPriceState(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={() => handleChange()}
              variant="contained"
              color="primary"
              style={{ marginLeft: "10px" }}
            >
              Filter
            </Button>
          </>
        )}
      </div>

      {/* Display the products list */}
      <Products
        productList={finalProductList}
        wishList={wishList}
        setWishList={setWishList}
        addToFav={addToFav}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}
