import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductDescription from "../components/ProductDescription";
import { useAuth } from "../context/Auth";
import { useParams } from "react-router-dom";
import RouteMap from "../components/RouteMap";

const ProductDescriptionPage = () => {
  const { user } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const [props, setProps] = useState([]);
  const [location,setLocation] = useState({});
  const { id } = useParams();
  console.log(id);
  const LoadProduct = async () => {
    if (!user) return;
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

      if (response.data.success) {
        setIsLoading(false);
        setProps(response.data.data);
        setLocation({
          lat : response.data.data.userId.location.coordinates[1],
          lng : response.data.data.userId.location.coordinates[0],
        })
        console.log(response.data.data.userId.location.coordinates)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) LoadProduct();
  }, [user]);
  return isloading ? (
    "Loading"
  ) : (
    <div id="page-description">
      <ProductDescription props={props} />
      <RouteMap props={location}/>
    </div>
  );
};

export default ProductDescriptionPage;
