import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadWishlist = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/wishlist/",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data.data);
        setWishlist([1,2,3,4,5]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadWishlist();
    }
  }, [user]);
  return isLoading ? "loading" : wishlist.length > 0 ? (wishlist.map((curEle)=> "hi")) : (<p>No Product In the WishList</p>);
};

export default WishlistPage;
