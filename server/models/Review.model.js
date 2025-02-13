import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  rating: {
    type: Number,
    require:[true,"Ratings are required"]
  },
  description: {
    type: String,
  },
});

export const Review = model("Review",ReviewSchema)