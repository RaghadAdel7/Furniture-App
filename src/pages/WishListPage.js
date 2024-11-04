import { useEffect, useState } from "react";
import React from "react";
import WishList from "../components/wishlist/WishList";
import CircularProgress from "@mui/material/CircularProgress";

export default function WishListPage(prop) {
  const { wishList, setWishList } = prop;
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
      <WishList wishList={wishList} setWishList={setWishList} />
    </div>
  );
}
