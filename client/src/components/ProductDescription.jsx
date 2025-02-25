import React, { useState } from "react";
import OwnerCard from "./OwnerCard";
import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/Auth";
import { useUser } from "../context/Profile";
import RouteMap from "./RouteMap";

const ProductDescription = ({ props }) => {
  const navigate = useNavigate();
  const { wishlist, setWishlist } = useUser();

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
        `http://localhost:4000/api/v1/wishlist/${_id}`,
        {},
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

  const removeFromWishlist = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/wishlist/${_id}`,
        {
          headers: {
            "Content-type": "application/json",
            "auth-token": user.token,
          },
        }
      );

      console.log(response);
      if (response.data.success) {
        toast.success("Removed from wishlist");

        setWishlist((prev) => prev.filter((curEle) => curEle._id !== id));
      }
    } catch (error) {
      toast.error("failed to remove");
      console.log(error);
    }
  };

  console.log(wishlist.find((curEle) => curEle._id === _id)
)
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
          <button id="btn">Rent Now</button>
          {wishlist.find((curEle) => _id === curEle._id) ? (
            <button onClick={removeFromWishlist} id="delete">remove from Wishlist</button>
          ) : (
            <button onClick={handleWishlist} id="btn">Add To Wishlist</button>
          )}
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
