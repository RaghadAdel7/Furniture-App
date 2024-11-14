import { useEffect, useState } from "react";
import React from "react";
import WishList from "../components/wishlist/WishList";
import CircularProgress from "@mui/material/CircularProgress";
import error from "../error.png";

export default function WishListPage(prop) {
  const { wishList, setWishList,addToCart } = prop;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false); 
      } 
      catch (err) {
        setError("Failed to load wishlist."); 
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        Lodaing..
      </div>
    );
  }
 if (error) {
   return (
     <div style={{ textAlign: "center" }}>
       <img src={error} alt="Error" style={{ width: "200px" }} />
       <p>{error}</p>
     </div>
   );
 }
  return (
    <div>
      <WishList
        wishList={wishList}
        setWishList={setWishList}
        addToCart={addToCart} 
      />
    </div>
  );
}
