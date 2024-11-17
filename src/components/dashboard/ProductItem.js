import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Popover } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ProductItem.css";

export default function ProductItem({ product, fetchData }) {
  const [editProductInfo, setEditProductInfo] = useState({
    productName: product.productName || "",
    productColor: product.productColor || "",
    description: product.description || "",
    productPrice: product.productPrice || "",
    weight: product.weight || "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const deleteProduct = () => {
    const token = localStorage.getItem("token");
    const url = `https://backendproject-cn6u.onrender.com/api/v1/products/${product.productId}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204 || 200) {
          alert("Product deleted successfully!");
          fetchData();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditProductInfo((prevState) => ({
      ...prevState,
      [name]: name === "productPrice" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");
    const updatedProduct = {
      ...editProductInfo,
      productId: product.productId,
      productPrice: parseFloat(editProductInfo.productPrice) || "",
    };

    axios
      .put(
        `https://backendproject-cn6u.onrender.com/api/v1/products/${product.productId}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Product updated successfully!");
          setAnchorEl(null);
          fetchData();
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
      });
  };

  return (
    <div className="product-item">
      <h4>{product.productName}</h4>
      <p>{product.description}</p>
      <p>
        <strong>Price: </strong> {product.productPrice} SAR
      </p>
      <p>
        <strong>Weight: </strong> {product.weight} kg
      </p>
      <p>
        <strong>Color: </strong> {product.productColor}
      </p>

      <div className="button-group">
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleClick}
        ></Button>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={deleteProduct}
        ></Button>
      </div>

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
        <div className="popover-content">
          <TextField
            name="productName"
            label="Product Name"
            variant="standard"
            value={editProductInfo.productName}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            variant="standard"
            value={editProductInfo.description}
            onChange={handleEditChange}
            fullWidth
            className="text-field"
          />
          <TextField
            name="productColor"
            label="Color"
            variant="standard"
            value={editProductInfo.productColor}
            onChange={handleEditChange}
            fullWidth
            className="text-field"
          />
          <TextField
            name="productPrice"
            label="Product Price"
            variant="standard"
            type="number"
            value={editProductInfo.productPrice}
            onChange={handleEditChange}
            fullWidth
            className="text-field"
          />
          <TextField
            name="weight"
            label="Weight"
            variant="standard"
            type="number"
            value={editProductInfo.weight}
            onChange={handleEditChange}
            fullWidth
            className="text-field"
          />
          <Button
            variant="contained"
            color="secondary"
            className="save-button"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </Popover>
    </div>
  );
}
