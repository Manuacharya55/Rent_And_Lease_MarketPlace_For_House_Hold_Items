import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
import { Wishlist } from "../models/Wishlist.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import mongoose from "mongoose";

export const listAllWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const wishlist = await Wishlist.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(_id)
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "productId",
      foreignField: "_id",
      as: "product"
    }
  },
  {
    $unwind: "$product"
  },
  {
    $lookup: {
      from: "addresses",
      localField: "product.userId",
      foreignField: "user",
      as: "address"
    }
  },{
      $addFields: {
        address: { $arrayElemAt: ["$address", 0] },
      },
    },{
    $project: {
      product: {
        _id: 1,
        name: 1,
        category: 1,
        price: 1,
        images: 1
      },
      address: {
        state: "$address.state",
        district: "$address.district"
      }
    }
  }
]);



  if (!wishlist) {
    throw new ApiError(400, "No wishlist found");
  }

  res.status(200).json(new ApiSuccess(200, wishlist, "Wishlist fetched successfully"));
});

export const addProductToWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;


  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "No such user exists");
  }

  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new ApiError(400, "No such product exists");
  }

  const existingWishlist = await Wishlist.findOne({
    user: _id,
    productId: id,
  });

  if (existingWishlist) {
    throw new ApiError(400, "Product already exists in wishlist");
  }

  const wishlist = await Wishlist.create({
    user: _id,
    productId: id,
  });

  res.status(200).json(new ApiSuccess(200, wishlist, "Product added to wishlist"));
});

export const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No such user exists");
  }

  const wishlist = await Wishlist.deleteOne({
    user: _id,
    productId: id,
  });

  if(!wishlist){
    throw new ApiError(400, "No wishlist found");
  }
  
  res.status(200).json(new ApiSuccess(200, wishlist, "Product removed from wishlist"));
});
