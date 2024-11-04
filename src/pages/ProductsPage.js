import React, { useState } from "react";
import Products from "../components/products/Products";
import CircularProgress from "@mui/material/CircularProgress";
import ProductsPagination from "../components/products/ProductsPagination";
import PriceRange from "../components/products/PriceRange";
import { TextField } from "@mui/material";
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
  handleChange, //pagination
  userInputHandler, //for search user inpu
  setMinPrice,
  setMaxPrice,
  userInput,
}) {
  // const [userInput, setUserInput] = useState("");
  console.log("Product List in ProductsPage:", productList);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  // function onChangeHandler(event) {
  //   setUserInput(event.target.value);
  // }
  // Filter products based on user input
  // const filteredProducts = productList.filter((product) =>
  //   product.productName?.toLowerCase().includes(userInput.toLowerCase())
  // );
  const filteredProducts = productList.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory.name
      : true;

    const matchesSubcategory = selectedSubcategory
      ? product.subcategory === selectedSubcategory.name
      : true;

    return matchesCategory && matchesSubcategory;
  });

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
      <div className="search-wrapper">
        {/* <div className="search-container"> */}
        <TextField
          id="search"
          label="Search products..."
          variant="outlined"
          value={userInput}
          onChange={userInputHandler}
          fullWidth
        />
        {/* </div> */}
      </div>

      <Products
        productList={filteredProducts}
        wishList={wishList}
        setWishList={setWishList}
        addToFav={addToFav}
        totalCount={totalCount}
        page={page}
        handleChange={handleChange}
      />
      <PriceRange setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
    </div>
  );
}
