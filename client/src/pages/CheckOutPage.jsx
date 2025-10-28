import React, { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Auth";

const CheckOutPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [rentedDate, setRentedDate] = useState(true);
  const [selectedDate, setSelectedDate] = useState();
  const [product, setProduct] = useState();

  const fetchData = async () => {
    if (!id || !user) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );
      console.log(response.data.data);
      setProduct({
        productName: response.data.data.productName,
        category: response.data.data.category,
        price: response.data.data.price,
        _id: response.data.data._id,
      });
      const dateArray = response.data.data.rentedDates.map(
        (curEle) => curEle.split("T")[0]
      );
      setRentedDate(dateArray);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  return isLoading ? (
    "loading"
  ) : (
    <div id="container">
      <div id="image-holder">
        <img
          src="https://img.freepik.com/premium-photo/house-with-black-roof-black-door-that-says-welcome-front_1261459-3805.jpg?ga=GA1.1.264547320.1740062602&semt=ais_hybrid"
          alt=""
        />
      </div>
      <div id="check-out">
        <MyCalendar product={product} />
      </div>
    </div>
  );
};

export default CheckOutPage;
