import {Product} from "../models/Product.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import {Rent} from "../models/Rent.model.js";
import {User} from "../models/User.model.js";

export const productDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch total number of user products
  const totalProducts = await Product.countDocuments({ userId: userId });

  // Fetch count of rented products
  const rentedProducts = await Product.countDocuments({
    userId: userId,
    isRented: true,
  });

  // Fetch count of non-rented products
  const nonRentedProducts = await Product.countDocuments({
    userId: userId,
    isRented: false,
  });

  // Fetch list of all products
  const allProducts = await Product.find({ userId: userId });

  res.json({
    totalProducts,
    rentedProducts,
    nonRentedProducts,
    allProducts,
  });
});

export const getRentedProducts = asyncHandler(async (req, res) => {
const userId = req.user._id;
const rentedProducts = await Rent.find({ ownerId: userId, status: "Not Returned" })
    .populate({
        path: "productId",
        select: "productName category productImage",
    })
    .populate({
        path: "purchaserId",
        select: "name phonenumber address",
    });
console.log(rentedProducts);
res.json(rentedProducts);
});

export const returnRentedProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  // Update the product's isRented status to false
  const product = await Product.findOneAndUpdate(
    { _id: id, userId: userId, isRented: true },
    { isRented: false },
    { new: true }
  );

  if (!product) {
    return res
      .status(404)
      .json({ message: "Product not found or not rented by user" });
  }

  // Update the Rent model's status to 'returned'
  await Rent.findOneAndUpdate(
    { productId: id, ownerId: userId, status: "Not Returned" },
    { status: "Returned" }
  );

  res.json({ message: "Product returned successfully", product });
});

export const getAllRents = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const rents = await Rent.find({ owner: userId })
        .populate({
            path: "purchaserId",
            select: "name phoneNumber address",
        })
        .populate({
            path: "productId",
            select: "name category",
        });

    res.json(rents);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

    const rents = await Rent.find({ purchaserId: userId })
        .populate({
            path: "ownerId",
            select: "name phonenumber address ",
        })
        .populate({
            path: "productId",
            select: "productName category productImage",
        });

    res.json({msg:"hi",rents});
})