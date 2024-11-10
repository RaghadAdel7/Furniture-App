// import React, { useState, useEffect } from "react";
// import Cart from "../components/cart/Cart";
// import CircularProgress from "@mui/material/CircularProgress";
// import CartItem from "../components/cart/CartItem";
//   import axios from "axios";

// export default function CartPage(prop) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { cartList, setCartList, userData } = prop;

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       if (Math.random() < 0.5) {
//         setError("Failed to load cart items.");
//       }
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     return (
//       <div className="progress">
//         <CircularProgress color="inherit" />
//       </div>
//     );
//   }

// const createCart = async (cartItems, userId) => {
//   try {
//     const response = await axios.post("http://localhost:5125/api/v1/cart", {
//       UserId: userId,
//       CartDetails: cartItems.map(item => ({
//         ProductId: item.id,
//         Quantity: item.quantity,
//       })),
//     });
//     return response.data; // This will return the created cart data
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     throw error;
//   }
// };


//  const handleAddToCart = async (cartItems) => {
//    setLoading(true);
//    try {
//      const newCart = await createCart(cartItems, userData.id); // assuming userData has an `id` field
//      setCartList(newCart.CartDetails); // Update cartList with the details from the created cart
//    } catch (err) {
//      setError("Failed to add items to cart. Please try again.");
//    } finally {
//      setLoading(false);
//    }
//  };
//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       {/* Pass cartItems to Cart component */}
//       {/* <Cart cartItems={cartItems} setCartItems={setCartItems} /> */}
//       {/* Optionally, you can map over cartItems here or in CartItem component */}
//       {/* {cartItems.map((item) => (
//         <CartItem
//           key={item.id}
//           cart={item}
//           cartItems={cartItems}
//           setCartItems={setCartItems}
//         />
//       ))} */}
//       <Cart
//         cartList={cartList}
//         setCartList={setCartList}
//         userData={userData}
//         onAddToCart={handleAddToCart}
//       />
//     </div>
//   );
// }
import React from "react";
import Cart from "../components/cart/Cart";

export default function CartPage(prop) {
  const { cartList, setCartList, userData } = prop;
  
  return (
    <div>
      <Cart
        cartList={cartList}
        setCartList={setCartList}
        userData={userData}
      />
    </div>
  );
}