//not working?
// import React, { useState } from "react";
// import { TextField, InputAdornment, IconButton } from "@mui/material";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import Categories from "../category/Categories";
// import Subcategories from "../category/SubCategories";
// import Products from "../products/Products";

// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import { Button } from "@mui/material";        

// export default function PriceRange({
//   productList,
//   categories,
//   wishList,
//   setWishList,
//   loading,
//   error,
//   totalCount,
//   page,
//   handleChange,
//   setMinPrice,
//   setMaxPrice,
// }) {
//     console.log("Product List in Price:", productList);

//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("");
//   function onChangeHandlerMinPrice(event) {
//     setMinPrice(event.target.value);
//   }

//   function onChangeHandlerMaxPrice(event) {
//     setMaxPrice(event.target.value);
//   }
//   const filteredProducts = productList.filter((product) => {
//     const matchesCategory = selectedCategory
//       ? product.category === selectedCategory.name
//       : true;

//     const matchesSubcategory = selectedSubcategory
//       ? product.subcategory === selectedSubcategory.name
//       : true;

//     return matchesCategory && matchesSubcategory;
//   });
//   return (
//     <div className="filter-container">
//       <IconButton onClick={handleChange} color="primary">
//         <FilterAltIcon />
//       </IconButton>
//       <TextField
//         label="Min Price"
//         type="number"
//         onChange={(e) => setMinPrice(e.target.value)}
//         variant="outlined"
//         size="small"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AttachMoneyIcon />
//             </InputAdornment>
//           ),
//         }}
//         style={{ marginRight: "10px" }}
//       />
//       <TextField
//         label="Max Price"
//         type="number"
//         onChange={(e) => setMaxPrice(e.target.value)}
//         variant="outlined"
//         size="small"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <AttachMoneyIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
//       <Button
//         onClick={() => handleChange()}
//         variant="contained"
//         color="primary"
//         style={{ marginLeft: "10px" }}
//       >
//         Filter
//       </Button>
      
//     </div>
//   );
// }
