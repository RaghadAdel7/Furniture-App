import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Popover } from "@mui/material";

export default function ProductItem({ product, fetchData }) {
  // State to handle the form values for editing
  const [editProductInfo, setEditProductInfo] = useState({
    productName: product.productName || "",
    productColor: product.productColor || "",
    description: product.description || "",
    productPrice: product.productPrice || "",
    weight: product.weight || "",
  });

  // State for managing Popover visibility
  const [anchorEl, setAnchorEl] = useState(null);

  // Open and close Popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


function deleteProduct() {
  const token = localStorage.getItem("token");
  const url = `http://localhost:5125/api/v1/products/${product.productId}`;

  axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
    console.log("Deleted product:", res);
      if (res.status === 204) {
        alert("Product deleted successfully!");
        fetchData();
      }
    })
    .catch((error) => console.log(error));
}

const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditProductInfo((prevState) => ({
      ...prevState,
      [name]: name === "productPrice" ? parseFloat(value) || "" : value, // Ensure productPrice is parsed as a number
    }));
  };

  const handleSaveChanges = () => {
    const token = localStorage.getItem("token");
    const updatedProduct = {
      ...editProductInfo,
      productId: product.productId,
      productPrice: parseFloat(editProductInfo.productPrice) || "", // Make sure it's a number
    };

    axios
      .put(
        `http://localhost:5125/api/v1/products/${product.productId}`,
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
          console.log("updated product:" , res);
          setAnchorEl(null);
          fetchData(); // Re-fetch the product list after update
          handleClose(); // Close the popover
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product.");
      });
  };

  return (
    <div>
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

      {/* Edit Button */}
      <Button variant="contained" color="primary" onClick={handleClick}>
        Edit
      </Button>
      <Button variant="contained" color="error" onClick={deleteProduct}>
        Delete
      </Button>
      {/* Popover for Editing Product */}
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
            style={{ marginTop: "10px" }}
          />
          <TextField
            name="productColor"
            label="Color"
            variant="standard"
            value={editProductInfo.productColor}
            onChange={handleEditChange}
            fullWidth
            style={{ marginTop: "10px" }}
          />
          <TextField
            name="productPrice"
            label="Product Price"
            variant="standard"
            type="number"
            value={editProductInfo.productPrice}
            onChange={handleEditChange}
            fullWidth
            style={{ marginTop: "10px" }}
          />
          <TextField
            name="weight"
            label="Weight"
            variant="standard"
            type="number"
            value={editProductInfo.weight}
            onChange={handleEditChange}
            fullWidth
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </Popover>
    </div>
  );
}
