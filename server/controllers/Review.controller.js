import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../models/Product.model.js";
import { Review } from "../models/Review.model.js";

export const addComment = asyncHandler(async (req, res) => {
  const { rating, description } = req.body;
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new ApiError(400, "No Such Products");
  }

  const comment = await Review.create({
    userId: existingUser._id,
    productId: existingProduct._id,
    rating,
    description,
  });

  existingProduct.reviewId.push(comment._id);
  await existingProduct.save();
  res.send({
    success: true,
    data: comment,
  });
});

export const editComment = asyncHandler(async (req, res) => {
  const { rating, description } = req.body;
  const { id, commentId } = req.params;
  const { _id } = req.user; // User ID from authentication middleware

  // Ensure product exists
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new ApiError(404, "No Such Product Exists");
  }

  // Update the comment directly
  const updatedComment = await Review.findOneAndUpdate(
    { _id: commentId, userId: _id, productId: id },
    { rating, description },
    { new: true }
  );

  if (!updatedComment) {
    throw new ApiError(403, "You cannot edit someone else's comment");
  }

  res.json({
    success: true,
    data: updatedComment,
  });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const { id, commentId } = req.params;
  const { _id } = req.user; // User ID from authentication middleware

  // Ensure the user exists
  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  // Ensure the product exists
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    throw new ApiError(400, "No Such Product Exists");
  }

  // Find and delete the comment
  const deletedComment = await Review.findOneAndDelete({
    _id: commentId, // Ensure we're deleting the correct comment
    userId: _id, 
    productId: id,
  });

  if (!deletedComment) {
    throw new ApiError(400, "No Such Comment Exists");
  }

  // Remove comment from product's review list
  existingProduct.reviewId = existingProduct.reviewId.filter(
    (reviewId) => reviewId.toString() !== commentId
  );

  await existingProduct.save(); // Save updated product data

  res.json({
    success: true,
    data: deletedComment, // Return the correct deleted comment
  });
});

