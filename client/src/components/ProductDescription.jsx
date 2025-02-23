import React, { useState } from "react";
import NavBar from "./NavBar";
import OwnerCard from "./OwnerCard";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/Auth";

const ProductDescription = ({ props }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    productName,
    category,
    description,
    productImage,
    userId,
    price,
    _id,
  } = props;
  // console.log(_id ,user.token)
  const [subimg, setSubimg] = useState([]);

  const [mainImg, setMainImg] = useState(productImage[0]);

  const handleImageClick = (e) => {
    setMainImg(e.target.src);
  };

  const handleWishlist = async () => {
    if (!_id) {
      toast.error("failed to add wishlist");
      console.log("hi error");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/wishlist/${_id}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        toast.success("added to wishlist");
      }
      console.log("hi");
    } catch (error) {
      toast.error("Failed to add to wishlist");
      console.log(error);
    }
  };

  return (
    <div id="product-desc">
      <div id="img-desc">
        <img src={mainImg} alt="" />
      </div>
      <div id="prod-desc">
        <h1 id="prod-name">{productName}</h1>
        <p id="desc">{description}</p>
        <p id="prod-category">Category : {category}</p>
        <h1 id="price">{price}Rs</h1>
        <OwnerCard
          props={{
            name: userId.name,
            phone: userId.phonenumber,
            address: userId.address,
            email: userId.email,
            avatar: userId.avatar,
          }}
        />

        <div id="btn-holder">
          <button>Rent Now</button>
          <button onClick={handleWishlist}>Add To Wishlist</button>
        </div>
      </div>
      <div id="sub-img">
        <div id="navigation" onClick={() => navigate(-1)}>
          <MoveLeft />
        </div>
        <div id="sub-img-btn">
          <img src={productImage[0]} onClick={handleImageClick} alt="" />
        </div>
        <div id="sub-img-btn">
          <img src={productImage[1]} onClick={handleImageClick} alt="" />
        </div>
        <div id="sub-img-btn">
          <img src={productImage[2]} onClick={handleImageClick} alt="" />
        </div>
        <div id="sub-img-btn">
          <img src={productImage[3]} onClick={handleImageClick} alt="" />
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
