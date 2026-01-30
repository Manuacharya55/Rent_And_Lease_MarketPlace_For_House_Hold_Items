import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        required: [true, "address is required"],
    },
    location: {
        lat: Number,
        lng: Number,
    },
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
})

export const Address = model("Address", addressSchema);