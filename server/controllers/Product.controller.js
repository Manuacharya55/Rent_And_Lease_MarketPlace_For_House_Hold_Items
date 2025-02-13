import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/Product.model.js";
import { User } from "../models/User.model.js";

export const listAllProducts = asyncHandler(async (req, res) => {
  const { category, price, limit, page } = req.query;

  const query = { isActive: true };

  const pagelimit = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * pagelimit;

  if (category) query.category = category;
  if (price) query.price = { $lte: parseFloat(price) };

  const products = await Product.find(query)
    .skip(skip)
    .limit(pagelimit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: products,
    pagination: {
      currentPage: pageNumber,
      limit: pagelimit,
    },
  });
});

// get single product
export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  
  res.send({
    success: true,
    data: product,
  });
});

export const addProduct = asyncHandler(async (req, res) => {
  const { productName, description, category, price, productImage } = req.body;

  if (!productName || !description || !category || !price || !productImage) {
    res.status(400);
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    throw new ApiError(400, "User not found");
  }

  const product = await Product.create({
    productName,
    description,
    category,
    price,
    productImage,
    userId: req.user._id,
  });

  existingUser.products.push(product._id);
  await existingUser.save();

  res.send({
    success: true,
    data: product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productName, description, category, price, productImage } = req.body;

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
    { productName, description, category, price, productImage },
    { new: true}
  );

  res.status(200).json({
    success: true,
    data: updatedProduct,
  });
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
    { isActive: false },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: deletedProduct,
  });
});
