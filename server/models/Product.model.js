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
      "Kitchen",
      "Bedroom",
      "Electronics",
      "Bathroom",
      "Furniture",
      "Kitchenware",
      "Clothing",
      "Laundry Care",
      "Decor",
      "garden"
    ],
    require: [true, "Product category is required"],
  },
  price:{
    type:Number,
    require:[true,"Product price is required"]
  },
  isActive:{
    type:Boolean,
    default:true
  },
  images:[{
    type:String,
    require:[true,"Product image is required"]
  }],
  userId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    require:[true,"User id is required"]
  },
  rentedDates:[{
    type:Date
  }]
},{timestamps:true});

export const Product = model("Product", ProductSchema);
