import { Rent } from "../models/Rent.model.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiSuccess from "../utils/ApiSuccess.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = asyncHandler(async (req, res) => {
  const { productId, date, amount, paymentIntentId } = req.body;

  if (!productId || !date || !amount || !paymentIntentId) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const existingUser = await User.findById(req.user._id);
  if (!existingUser)
    return res.status(404).json({ error: "User not found!" });

  const existingProduct = await Product.findById(productId);
  if (!existingProduct)
    return res.status(404).json({ error: "Product not found!" });

  const existingOwner = await User.findById(existingProduct.userId);
  if (!existingOwner)
    return res.status(404).json({ error: "Product owner not found!" });


  const rentDateObj = new Date(date);

  if (isNaN(rentDateObj.getTime()))
    return res.status(400).json({ error: "Invalid rent date!" });

  const returnDate = new Date(rentDateObj);
  returnDate.setDate(returnDate.getDate() + 1);

  const totalAmount = amount / 100;
  if(totalAmount !== existingProduct.price){
    throw new ApiError(400, "Invalid amount!");
  }

  const order = Rent.create({
    owner: existingOwner._id,
    borrower: existingUser._id,
    product: existingProduct._id,
    rentDate: rentDateObj,
    returnDate,
    amount : totalAmount,
    paymentId: paymentIntentId,
  });


  res.status(200).json(new ApiSuccess(200, order, "Product Booked Successfully"));
});

export const getBookedDates = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const existingProduct = await Product.findById(productId).select("images name price category");
  console.log(existingProduct);

  if (!existingProduct)
    return res.status(404).json({ error: "Product not found!" });

  const bookedDates = await Rent.find({ product:productId }).select("rentDate -_id");

  const totalAmount = existingProduct.price * 100;

  const productIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "inr",
    metadata: {
      productId: existingProduct._id?.toString(),
      ownerId: existingProduct?.userId?.toString(),
      purchaserId: req.user._id?.toString(),
    }
  })

  const data = {
    product: existingProduct,
    bookedDates,
    key: productIntent.client_secret
  }
  res.status(200).json(new ApiSuccess(200, data, "Dates fetched successfully"))

});

// export const makeBooking = asyncHandler()