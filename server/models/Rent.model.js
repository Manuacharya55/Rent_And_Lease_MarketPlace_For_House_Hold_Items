import { Schema,model } from "mongoose";

const RentSchema = new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    borrower:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
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
    amount:{
        type:Number,
        required:[true,"Total amount is required"]
    },
    status:{
        type:String,
        enum:["not borrowed","borrowed","returned","overdue"],
        default:"not borrowed"
    },
    paymentId:{
        type:String
    }
})

export const Rent = model("Rent",RentSchema)