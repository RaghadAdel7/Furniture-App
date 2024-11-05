import { Button } from "@mui/material";
import axios from "axios";
import React from "react";

export default function ProductItem({ product, fetchData }) {
  // Function to delete the product by ID
  function deleteProduct() {
    const token = localStorage.getItem("token");
    const url = `http://localhost:5125/api/v1/products/${product.productId}`;

    // Send DELETE request to backend
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          alert("Product deleted successfully!");
          fetchData(); // Re-fetch product list after deletion
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h4>{product.productName}</h4>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.productPrice}
      </p>
      <p>
        <strong>Weight:</strong> {product.weight} kg
      </p>
      {/* Add Delete button */}
      <Button variant="contained" color="error" onClick={deleteProduct}>
        Delete
      </Button>
    </div>
  );
}
