import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { NavLink } from "react-router-dom";
import DashboardProductCard from "../components/DashboardProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadProducts = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/",
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      if (response.data.success) {
        setIsLoading(false);
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) loadProducts();
  }, [user]);
  return isLoading ? (
    "Loading"
  ) : (
    <div id="product-holder">
      {products.map((item) => (
        <NavLink to={`/product/${item._id}`}>
            <ProductCard
          key={item._id} // Assuming each product has a unique _id
          props={{
            productName: item.productName,
            category: item.category,
            price: item.price,
            productImage: item.productImage,
            isWishlist:false,
            isDashboard:false,
            id:item._id
          }}
        />
        </NavLink>
      ))}
    </div>
  );
};

export default ProductsPage;
