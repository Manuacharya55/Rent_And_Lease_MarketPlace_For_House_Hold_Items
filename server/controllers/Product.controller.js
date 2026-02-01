import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import mongoose from "mongoose";

export const listAllProducts = asyncHandler(async (req, res) => {
  const { category, price, limit, page } = req.query;

  const query = {
    isActive: true,
    userId: { $ne: req.user._id } // Exclude products where userId is current user
  };

  const pagelimit = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * pagelimit;

  if (category) query.category = category;
  if (price) query.price = { $lte: parseFloat(price) };

  const count = await Product.countDocuments(query);

  const products = await Product.aggregate([
    {
      $match: query
    },
    {
      $lookup: {
        from: "addresses",
        localField: "userId",
        foreignField: "user",
        as: "address"
      }
    },
    {
      $unwind: "$address"
    },
    {
      $project: {
        name: 1,
        category: 1,
        price: 1,
        images: 1,
        userId: 1,
        district: "$address.district",
        state: "$address.state"
      }
    },
    { $skip: skip },
    { $limit: pagelimit },
    { $sort: { createdAt: -1 } }
  ]);

  const data = {
    data: products,
    pagination: {
      currentPage: pageNumber,
      limit: pagelimit,
      totalDocuments: count,
      totalPages: Math.ceil(count / pagelimit),
    },
  }
  res.status(200).json(new ApiSuccess(200, data, "Products fetched successfully"));
});


// get single product
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const product = await Product.aggregate([{
    $match: {
      _id: new mongoose.Types.ObjectId(id)
    }
  }, {
    $lookup: {
      from: "addresses",
      localField: "userId",
      foreignField: "user",
      as: "address"
    }
  }, {
    $unwind: "$address"
  }, {
    $project: {
      name: 1,
      category: 1,
      price: 1,
      images: 1,
      userId: 1,
      address: "$address"
    }
  }, {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }, {
    $unwind: "$user"
  }, {
    $project: {
      name: 1,
      category: 1,
      price: 1,
      images: 1,
      userId: 1,
      address: "$address",
      user: "$user"
    }
  }])

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.status(200).json(new ApiSuccess(200, product, "Product fetched successfully"));
});

export const addProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, images } = req.body;

  if (!name || !description || !category || !price || !images || images.length < 4) {
    console.log({ name, description, category, price, images })
    // res.status(400).json();
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  const product = await Product.create({
    name,
    description,
    category,
    price,
    images,
    userId: req.user._id,
  });

  res.send(new ApiSuccess(200, product, "Product added successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, price, images } = req.body;

  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  const product = await Product.findOne({
    _id: id,
    userId: _id,
  });

  if (!product) {
    throw new ApiError(
      400,
      "Product not found or you are not authorized to update this product"
    );
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, category, price, images },
    { new: true }
  );

  res.status(200).json(new ApiSuccess(200, updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const existingUser = await User.findById(_id);

  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  const product = await Product.findOne({ _id: id, userId: _id });

  if (!product) {
    throw new ApiError(
      400,
      "Product not found or you are not authorized to delete this product"
    );
  }

  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { isActive: !product.isActive },
    { new: true }
  );

  res.status(200).json(new ApiSuccess(200, deletedProduct, `${product.isActive ? "Product deleted successfully" : "Product activated successfully"}`));
});

export const myProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { limit, page } = req.query;
  const pagelimit = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * pagelimit;

  const existingUser = await User.findById(_id);
  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  const products = await Product.find({
    userId: _id,
  }).skip(skip).limit(pagelimit);

  const count = await Product.countDocuments({
    userId: _id
  });

  const data = {
    data: products,
    pagination: {
      currentPage: pageNumber,
      limit: pagelimit,
      totalDocuments: count,
      totalPages: Math.ceil(count / pagelimit),
    },
  }
  res.status(200).json(new ApiSuccess(200, data, "Products fetched successfully"));
});
