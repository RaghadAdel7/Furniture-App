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
import ProductDetails from "../components/productDetails/ProductDetails";
import Cart from "../components/cart/Cart";

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
  userInput,
  cartList,
  setCartList,
  addToCart,
  addItemToCart,
  cartItems,
  setCartItems,
  cartId,
}) {
  // States
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [minPrice, setMinPriceState] = useState("");
  const [maxPrice, setMaxPriceState] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null);

  // Filtered products based on category, subcategory, and price
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

  // Get the highest-priced product from the filtered list
  const getHighestPriceProduct = (filteredProducts) => {
    if (filteredProducts.length === 0) return null;
    return filteredProducts.reduce(
      (max, product) =>
        product.productPrice > max.productPrice ? product : max,
      filteredProducts[0]
    );
  };

  // Filtered products
  const filteredProducts = getFilteredProducts();

  // Get the highest-priced product from the filtered list
  const highestPricedProduct = getHighestPriceProduct(filteredProducts);

  // Sort filtered products based on the selected 
 const sortedProducts = [...filteredProducts].sort((a, b) => {
   if (sortOrder === "asc") {
     return a.productPrice - b.productPrice; // Low to High
   } else if (sortOrder === "desc") {
     return b.productPrice - a.productPrice; // High to Low
   } else if (sortOrder === "latest") {
     return new Date(b.addedDate) - new Date(a.addedDate); // Latest Arrivals
   }
   return 0;
 });

  // Combine the highest-priced product at the top only if sorting by High to Low
  const finalProductList =
    sortOrder === "desc" && highestPricedProduct
      ? [highestPricedProduct, ...sortedProducts]
      : sortedProducts;
console.log(finalProductList);

  // Sort Menu Handlers
  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelection = (order) => {
    setSortOrder(order);
    setAnchorEl(null); 
  };

  const togglePriceFilter = () => {
    setShowPriceFilter(!showPriceFilter);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <CircularProgress color="inherit" />
        We are fetching products ..
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Categories
        categories={categories}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <Subcategories
          subcategories={selectedCategory.subcategories}
          setSelectedSubcategory={setSelectedSubcategory}
        />
      )}
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
      <div className="filterSort-container">
        <div>
          <IconButton
            onClick={handleSortMenuOpen}
            style={{ fontSize: "large", color: "black" }}
          >
            <SortIcon />
            Sort
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
              Sort by Price: Low to High <ArrowUpwardIcon />
            </MenuItem>
            <MenuItem onClick={() => handleSortSelection("desc")}>
              Sort by Price: High to Low <ArrowDownwardIcon />
            </MenuItem>
          </Menu>
        </div>
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

      <Products
        productList={finalProductList}
        // productList={productList}
        wishList={wishList}
        setWishList={setWishList}
        addToFav={addToFav}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
        cartList={cartList}
        setCartList={setCartList}
        addToCart={addToCart}
        addItemToCart={addItemToCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
        cartId={cartId}
      />
    </div>
  );
}
