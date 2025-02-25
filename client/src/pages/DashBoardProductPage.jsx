import React, { useEffect, useState } from "react";
import DashBoardNavBar from "../components/DashBoardNavBar";
import { useAuth } from "../context/Auth";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const DashBoardProductPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProducts = async () => {
    if (!user) return;

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/auth/myprofile",
        {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      if (response.data.success) {
        setProducts(response.data.data.products);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.token) {
      fetchProducts();
    }
  }, [user]);
  return (
    <div id="dashboard-container">
      <DashBoardNavBar />
      {isLoading ? (
        "Loading"
      ) : (
        <div id="product-holder">
          {products.map((item) => (
            <ProductCard
              props={{
                productName: item.productName,
                category: item.category,
                price: item.price,
                productImage: item.productImage,
                isWishlist: false,
                isDashboard: true,
                id: item._id,
                setProducts
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoardProductPage;
