import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductDescription from "../components/ProductDescription";
import { useAuth } from "../context/Auth";
import { useParams } from "react-router-dom";

const ProductDescriptionPage = () => {
  const { user } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const [props,setProps] = useState([])
  const {id} = useParams()
  console.log(id)
  const LoadProduct = async () => {
    if (!user) return
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
        setIsLoading(false)
        setProps(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user) 
    LoadProduct();
  }, [user]);
  return isloading ? "Loading" :<ProductDescription props={props}/>;
};

export default ProductDescriptionPage;
