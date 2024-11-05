import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductItem from "./ProductItem";
import {
  Button,
  Popover,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  productList
} from "@mui/material";

export default function ProductsDashboard( ) {
  // State to handle loading, errors, and form values
  const [productList, setProductList] = useState([]);
  const [productResponse, setProductResponse] = useState({
    products: [],
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productColor: "",
    description: "",
    sku: "",
    productPrice: "",
    weight: "",
    subCategoryId: "",
  });

  // State to manage Popover visibility
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle Popover Open and Close
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Subcategories
  const [subCategoryList, setSubCategoryList] = useState([]);

  // Fetch subcategories
  useEffect(() => {
    axios
      .get("http://localhost:5125/api/v1/subcategories")
      .then((response) => setSubCategoryList(response.data))
      .catch((error) => setError("Failed to fetch subcategories"));
  }, []);

  // Update productInfo based on form input
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const createProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:5125/api/v1/products";
      const response = await axios.post(url, productInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201 || response.status === 200) {
        alert("Product is created successfully");

        // Assuming response.data contains the new product data
        setProductList((prevList) => [...prevList, response.data]);
        handleClose();
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 401) {
          setError("Failed to create product. Bad request or unauthorized.");
        }
      } else {
        console.error("Error creating product:", error);
        setError("Failed to create product");
      }
    }
  };

  if (loading) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <div>
      <h1>Products Dashboard</h1>
      <Button variant="contained" onClick={handleClick}>
        Create New Product
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div style={{ padding: "15px" }}>
          {/* Form for creating a new product */}
          <TextField
            style={{ marginRight: "30px" }}
            name="productName"
            label="Product Name"
            variant="standard"
            value={productInfo.productName}
            onChange={onChangeHandler}
          />
          <TextField
            style={{ marginRight: "30px" }}
            name="productColor"
            label="Product Color"
            variant="standard"
            value={productInfo.productColor}
            onChange={onChangeHandler}
          />
          <TextField
            // style={{marginTop:"20px", marginRight: "30px" }}
            name="description"
            label="Description"
            variant="standard"
            value={productInfo.description}
            onChange={onChangeHandler}
          />
          <TextField
            style={{ marginTop: "20px", marginRight: "30px" }}
            name="sku"
            label="SKU"
            variant="standard"
            type="number"
            value={productInfo.sku}
            onChange={onChangeHandler}
          />
          <TextField
            style={{ marginTop: "20px", marginRight: "30px" }}
            name="productPrice"
            label="Product Price"
            variant="standard"
            type="number"
            value={productInfo.productPrice}
            onChange={onChangeHandler}
          />
          <TextField
            style={{ marginTop: "20px" }}
            name="weight"
            label="Weight"
            variant="standard"
            type="number"
            value={productInfo.weight}
            onChange={onChangeHandler}
          />
          <FormControl style={{ marginTop: "20px" }} fullWidth>
            <InputLabel id="subCategoryId">SubCategory Name</InputLabel>
            <Select
              labelId="subCategoryId"
              name="subCategoryId"
              value={productInfo.subCategoryId}
              label="SubCategory"
              onChange={onChangeHandler}
            >
              {subCategoryList.map((subCategory) => (
                <MenuItem
                  key={subCategory.subCategoryId}
                  value={subCategory.subCategoryId}
                >
                  {subCategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button style={{ marginTop: "20px" }} onClick={createProduct}>
            Add Product
          </Button>
        </div>
      </Popover>

      {error && <div>{error}</div>}
      <h2>List of Products</h2>
      {loading ? (
        <CircularProgress color="inherit" /> // Show loading spinner while products are loading
      ) : error ? (
        <div>{error}</div> // Display error message if fetching fails
      ) : productList.length > 0 ? (
        <div style={{ listStyleType: "none", paddingLeft: "0" }}>
          {productList.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              createProduct={createProduct} // Pass the fetchProducts function as a prop
            /> // Display product details
          ))}
        </div>
      ) : (
        <p>No products available.</p> // Display this message if no products are available
      )}
    </div>
  );
}
