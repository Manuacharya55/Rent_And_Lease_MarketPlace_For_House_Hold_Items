import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    require: [true, "Product name is required"],
  },
  description: {
    type: String,
    require: [true, "Product description is required"],
  },
  category: {
    type: String,
    enum: [
      "kitchen",
      "bedroom",
      "living room",
      "bathroom",
      "furniture",
      "appliances",
      "electronics",
      "kitchenware",
      "laundry",
      "cleaning",
      "decor",
      "lighting",
      "storage",
      "office",
      "tools",
      "garden",
      "outdoor",
      "fitness",
      "kids",
      "baby",
      "party",
      "clothing",
      "seasonal",
      "misc"
    ],
    require: [true, "Product category is required"],
  },
  price: {
    type: Number,
    require: [true, "Product price is required"]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String,
    require: [true, "Product image is required"]
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: [true, "User id is required"]
  },
  rentedDates: [{
    type: Date
  }]
}, { timestamps: true });

export const Product = model("Product", ProductSchema);
