import { Rent } from "../models/Rent.model.js";
import dotenv from "dotenv";
import Stripe from "stripe";
import { User } from "../models/User.model.js";
import { Product } from "../models/Product.model.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment = async (req, res) => {
  try {
    const { productId, rentDate, totalAmount, paymentMethodId } = req.body;

    // Validate request data
    if (!productId || !rentDate || !totalAmount || !paymentMethodId) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Fetch user and product details
    const existingUser = await User.findById(req.user._id);
    if (!existingUser)
      return res.status(404).json({ error: "User not found!" });

    const existingProduct = await Product.findById(productId);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found!" });

    const existingOwner = await User.findById(existingProduct.userId);
    if (!existingOwner)
      return res.status(404).json({ error: "Product owner not found!" });

    // Validate and parse rent date
    const rentDateObj = new Date(rentDate);
    if (isNaN(rentDateObj.getTime()))
      return res.status(400).json({ error: "Invalid rent date!" });

    // Calculate return date (1 day after rent date)
    const returnDate = new Date(rentDateObj);
    returnDate.setDate(returnDate.getDate() + 1);

    // Convert amount to paise
    const amountInPaise = Math.round(parseFloat(totalAmount) * 100);
    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ error: "Invalid total amount!" });
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Avoids redirect issues
      },
    });

    // Save rent transaction in MongoDB
    const rentTransaction = new Rent({
      ownerId: existingOwner._id,
      purchaserId: existingUser._id,
      productId: existingProduct._id,
      rentDate: rentDateObj,
      returnDate,
      totalAmount,
      paymentId: paymentIntent.id,
      status: "Not Returned",
    });

    await rentTransaction.save();

    await existingProduct.updateOne({ isRented: true });

    res.status(200).json({
      success: true,
      message: "Payment successful and rent recorded",
      rentTransaction,
    });
  } catch (error) {
    console.error("Stripe Payment Error:", error.message);
    res.status(500).json({ error: "Internal Server Error! " + error.message });
  }
};
