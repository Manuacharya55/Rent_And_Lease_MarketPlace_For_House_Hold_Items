import React, { useEffect } from "react";
import { useUser } from "../context/Profile";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ props }) => {
  const { wishlist, setWishlist,user } = useAuth();
  const navigate = useNavigate()
  const {
    productName,
    category,
    price,
    productImage,
    isWishlist,
    isDashboard,
    id,
    setProducts
  } = props;

  const removeFromWishlist = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/wishlist/${id}`,
        {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      console.log(response)
      if (response.data.success) {
        toast.success("Removed from wishlist");

        setWishlist((prev) => prev.filter((curEle) => curEle._id !== id));
      }
    } catch (error) {
      toast.error("failed to remove");
      console.log(error);
    }
  };

  const handleDeleteProduct =  async() =>{
    if(!id) return
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/product/${id}`,{
        headers:{
          "Content-Type":"application/json",
          "auth-token":user.token
        }
      });
      if(response.data.success){
        setProducts((prev)=> prev.filter((curEle)=> curEle._id !== response.data.data._id ))
      }
    } catch (error) {
      console.log(error)
      toast.error("Couldnt delete product")
    }
  }

  const handleEdit = () =>{
    navigate(`/dashboard/edit/${id}`)
  }

  return (
    <div id="prod-card">
      <div
        id="prod-img"
        style={{
          backgroundImage: `url("${productImage[0]}")`,
        }}
      ></div>
      <div id="prod-detail">
        <h2>{productName}</h2>
        {!isDashboard && <p id="category">{category}</p>}
        <p id="prod-price">{price}rs</p>

        {isDashboard && (
          <div id="btn-holder">
            <button id="edit" onClick={handleEdit}>Edit</button>
            <button id="delete" onClick={handleDeleteProduct}>Delete</button>
          </div>
        )}

        {isWishlist && (
          <button id="btn" onClick={removeFromWishlist}>
            Remove From Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
