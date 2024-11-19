import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsDashboard.css";
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
} from "@mui/material";

export default function ProductsDashboard() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productInfo, setProductInfo] = useState({
    productName: "",
    productColor: "",
    description: "",
    sku: "",
    productPrice: "",
    productImage: "",
    weight: "",
    subCategoryId: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState([]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const fetchSubCategories = () => {
    axios
      .get("https://sda-3-online-fe-repo-ykt5.onrender.comapi/v1/subcategories")
      .then((response) => {
        setSubCategoryList(response.data);
      })
      .catch(() => {
        setError("Failed to fetch subcategories");
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://sda-3-online-fe-repo-ykt5.onrender.comproducts")
      .then((response) => {
        setProductList(response.data.products || response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    fetchSubCategories();
    console.log(productList);
  }, []);

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
      const response = await axios.post(
        "http://localhost:5125/api/v1/products",
        productInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setProductList((prevList) => [...prevList, response.data]);
        handleClose();
      }
    } catch (error) {
      setError("Failed to create product.");
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <img src="/error-image.png" alt="Error" className="error-image" />
        <p>{error}</p>
      </div>
    );
  }

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
        We are fetching product ..
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Products Dashboard</h1>
      <Button
        variant="text"
        onClick={handleClick}
        className="addProduct-button"
        style={{ fontSize: "20px", color: "black" }}
      >
        + Add New Product
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <div className="popover-content">
          {/* Heading inside Popover */}
          <h2 style={{ textAlign: "center" }}>Add New Product</h2>
          <TextField
            name="productName"
            label={
              <span>
                Product Name <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            value={productInfo.productName}
            onChange={onChangeHandler}
          />
          <TextField
            name="productColor"
            label={
              <span>
                Product Color <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            value={productInfo.productColor}
            onChange={onChangeHandler}
          />
          <br></br>

          <TextField
            name="description"
            label={
              <span>
                Description <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            value={productInfo.description}
            onChange={onChangeHandler}
          />
          <TextField
            name="sku"
            label={
              <span>
                SKU <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            type="number"
            value={productInfo.sku}
            onChange={onChangeHandler}
          />
          <br></br>

          <TextField
            name="productPrice"
            label={
              <span>
                Product Price <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            type="number"
            value={productInfo.productPrice}
            onChange={onChangeHandler}
          />
          <TextField
            name="productImage"
            label="Product Image URL"
            variant="standard"
            value={productInfo.productImage}
            onChange={onChangeHandler}
          />
          <br></br>

          <TextField
            name="weight"
            label={
              <span>
                Weight <span style={{ color: "red" }}>*</span>
              </span>
            }
            variant="standard"
            type="number"
            value={productInfo.weight}
            onChange={onChangeHandler}
          />
          <FormControl fullWidth>
            <InputLabel>
              SubCategory Name <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <Select
              name="subCategoryId"
              value={productInfo.subCategoryId}
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
          <Button
            onClick={createProduct}
            className="addProduct-button"
            style={{
              backgroundColor: "#000",
              color: "white",
              border: "1px solid #fff",
              borderRadius: "8px",
              marginTop: "10px",
              alignItems: "end",
              padding: "12px 30px",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          >
            + Add Product
          </Button>
        </div>
      </Popover>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <CircularProgress color="inherit" className="loading-spinner" />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="product-list">
          {productList.map((product) => (
            <ProductItem
              key={product.productId}
              product={product}
              fetchData={fetchData}
            />
          ))}
        </div>
      )}
    </div>
  );
}
