import { Schema,model } from "mongoose";

const RentSchema = new Schema({
    ownerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    purchaserId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    rentDate:{
        type:Date,
        required:[true,"Rent date is required"]
    },
    returnDate:{
        type:Date,
        required:[true,"Return date is required"]
    },
    totalAmount:{
        type:Number,
        required:[true,"Total amount is required"]
    },
    // status:{
    //     type:String,
    //     enum:["Pending","Approved","Rejected","Returned"],
    //     default:"Pending"
    // }
})

export const Rent = model("Rent",RentSchema)