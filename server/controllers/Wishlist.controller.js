import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";

export const listAllWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const wishlist = await User.findById(_id).populate("wishlist");

  if (!wishlist) {
    throw new ApiError(400, "No wishlist found");
  }

  res.send({
    success: true,
    data: wishlist.wishlist,
  });
});

export const addProductToWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No such user exists");
  }

  existingUser.wishlist.findIndex((product) => product == id) === -1 &&
    existingUser.wishlist.push(id);

  await (await existingUser.save()).populate("wishlist");

  res.send({
    success: true,
    data: existingUser.wishlist,
  });
});

export const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "No such user exists");
  }

  const index = existingUser.wishlist.findIndex((product) => product == id);
  if (index === -1) {
    throw new ApiError(400, "Product not found in wishlist");
  }

  existingUser.wishlist.splice(index, 1);
  await existingUser.save();
  res.send({
    success: true,
    data: existingUser.wishlist,
  });
});
