import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/Product.model.js";
import { Review } from "../models/Review.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import mongoose from "mongoose";

export const addComment = asyncHandler(async (req, res) => {
  const { rating, description } = req.body;
  const { productId } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  const existingProduct = await Product.findById(productId);
  console.log(existingProduct)
  if (!existingProduct) {
    throw new ApiError(400, "No Such Products");
  }

  const comment = await Review.create({
    userId: existingUser._id,
    productId: existingProduct._id,
    rating,
    description,
  });

  const data = {userId: existingUser._id, productId: existingProduct._id, rating, description, user: {name: existingUser.name, avatar: existingUser.avatar}}
  res.status(201).json(new ApiSuccess(201, data, "Comment added successfully"));
});

export const editComment = asyncHandler(async (req, res) => {
  const { rating, description } = req.body;
  const { productId, commentId } = req.params;

  const { _id } = req.user; // User ID from authentication middleware

  // Ensure product exists
  const existingProduct = await Product.findById(productId);

  if (!existingProduct) {
    throw new ApiError(404, "No Such Product Exists");
  }

  // Update the comment directly
  const updatedComment = await Review.findOneAndUpdate(
    { _id: commentId, userId: _id, productId: productId },
    { rating, description },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(403, "Couldn't Update Comment");
  }

  res.status(200).json(new ApiSuccess(200, updatedComment, "Comment updated successfully"));
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { productId, commentId } = req.params;
  const { _id } = req.user; // User ID from authentication middleware

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  const deletedComment = await Review.findOneAndDelete({
    _id: commentId,
    userId: _id,
    productId: productId,
  });

  if (!deletedComment) {
    throw new ApiError(400, "No Such Comment Exists");
  }

  res.status(200).json(new ApiSuccess(200, deletedComment, "Comment deleted successfully"));
});

export const getAllComments = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  const existingProduct = await Product.findById(productId);
  if (!existingProduct) {
    throw new ApiError(400, "No Such Product Exists");
  }

  const comments = await Review.aggregate([
  {
    $match: {
      productId: new mongoose.Types.ObjectId(existingProduct._id)
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $unwind: "$user"
  },
  {
    $project: {
      rating: 1,
      description: 1,
      createdAt: 1,
      user: {
        _id: "$user._id",
        name: "$user.name",
        avatar: "$user.avatar",
      }
    }
  }
]);


  console.log(comments)
  res.status(200).json(new ApiSuccess(200, comments, "Comments fetched successfully"));
});