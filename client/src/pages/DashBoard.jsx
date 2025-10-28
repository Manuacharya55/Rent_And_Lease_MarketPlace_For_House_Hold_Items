import React, { useEffect, useState } from "react";
import DashBoardNavBar from "../components/DashBoardNavBar";
import { useAuth } from "../context/Auth";
import axios from "axios";

const DashBoard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    rentedProducts: 0,
    nonRentedProducts: 0,
  });

  const [products, setProducts] = useState([]);

  const { user } = useAuth();
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/dashboard/",{
        headers:{
          "Content-type": "application/json",
          "auth-token": user.token,
        }
      });
      const data = response.data;
      console.log(data);
      setData({
        totalProducts: data.totalProducts,
        rentedProducts: data.rentedProducts,
        nonRentedProducts: data.nonRentedProducts,
      });

      setProducts(data.allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    

    fetchData();
  }, []);

  return (
    <div id="dashboard-container">
      <DashBoardNavBar />

      <div id="count-holder">
        <div id="count">
          <h1>{data.totalProducts}</h1>
          <p>Products</p>
        </div>
        <div id="count">
          <h1>{data.rentedProducts}</h1>
          <p>Rented</p>
        </div>
        <div id="count">
          <h1>{data.nonRentedProducts}</h1>
          <p>Free</p>
        </div>
      </div>

      <div id="dashboard-container">
        <table>
          <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Product Image</th>
            <th>Price</th>
          </tr>
          </thead>
          {products.map((product) => (
            <tr>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.productImage[0]} alt={product.productName} />
              </td>
              <td>{product.price}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
