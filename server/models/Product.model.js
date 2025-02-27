import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  productName: {
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
      "Living Room",
      "Bathroom",
      "Furniture",
      "Kitchenware",
      "Clothing",
      "Laundry Care",
      "Decor",
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
  isRented:{
    type:Boolean,
    default:false
  },
  rentedDate:{
    type:Date
  },
  reviewId:[{
    type: Schema.Types.ObjectId,
    ref: "Review",
  }],
  productImage:[{
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
