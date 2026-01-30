import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
})

export const Wishlist = model("Wishlist", wishlistSchema);