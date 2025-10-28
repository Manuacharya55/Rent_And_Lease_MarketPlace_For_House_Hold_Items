import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { useUser } from "../context/Profile";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { wishlist, setWishlist } = useAuth();
  console.log(user)
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
        setWishlist(response.data.data);
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
  return isLoading ? (
    "loading"
  ) : wishlist.length > 0 ? (

    <div id="product-holder">
      {
        wishlist.map((item) => (
          <ProductCard
            props={{
              productName: item.productName,
              category: item.category,
              price: item.price,
              productImage: item.productImage,
              isWishlist: true,
              isDashboard: false,
              id:item._id,
              user
            }}
          />
        ))
      }
    </div>
  ) : (
    <p>No Product In the WishList</p>
  );
};

export default WishlistPage;
