import mongoose from "mongoose";
import { Product } from "../models/Product.model.js";
import { Rent } from "../models/Rent.model.js";
import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// get borrowed products (date optional)
export const getBorrowedProducts = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { date, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const matchStage = {
    owner: new mongoose.Types.ObjectId(_id),
  };

  // ✅ only add date filter if date exists
  if (date) {
    const start = new Date(date);
    start.setUTCHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);

    matchStage.rentDate = {
      $gte: start,
      $lt: end,
    };
  }

  const borrowedProducts = await Rent.aggregate([
    { $match: matchStage },

    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $lookup: {
        from: "users",
        localField: "borrower",
        foreignField: "_id",
        as: "borrower",
      },
    },
    {
      $unwind: {
        path: "$borrower",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        product: 1,
        borrower: 1,
        rentDate: 1,
        returnDate: 1,
        amount: 1,
        status: 1,
        paymentId: 1,
      },
    },

    { $skip: Number(skip) },
    { $limit: Number(limit) },
  ]);

  const count = await Rent.countDocuments(matchStage);
  const totalPages = Math.ceil(count / limit);

  res.status(200).json(
    new ApiSuccess(200, {
      data: borrowedProducts,
      pagination: {
        currentPage: Number(page),
        limit: Number(limit),
        totalDocuments: count,
        totalPages,
      },
    }, "Borrowed products fetched successfully")
  );
});


// update borrowed status
export const updateBorrowedStatus = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { status } = req.body;

  const existingRent = await Rent.findByIdAndUpdate(_id, { status }, { new: true });
  if (!existingRent)
    throw new ApiError(404, "Rent not found!");
  res.status(200).json(new ApiSuccess(200, existingRent, "Borrowed status updated successfully"))
});

// my order history
export const getMyOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let query = {
    borrower: _id,
  };

  const existingUser = await User.findById(query.borrower);
  if (!existingUser)
    throw new ApiError(404, "User not found!");


  const myOrders = await Rent.aggregate([
    {
      $match: { borrower: new mongoose.Types.ObjectId(_id) }
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "product"
      }
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner"
      }
    },
    {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        product: 1,
        owner: 1,
        borrower: 1,
        rentDate: 1,
        returnDate: 1,
        amount: 1,
        status: 1,
        paymentId: 1
      }
    },{ $skip: skip },
  { $limit: limit },
  { $sort: { rentDate: -1 } }
  ])

  const count = await Rent.countDocuments(query);
  const totalPages = Math.ceil(count / limit);

  const data = {
    data : myOrders,
    pagination :{
      currentPage : Number(page),
      limit: Number(limit),
      totalDocuments: count,
      totalPages,
    }
  }

  res.status(200).json(new ApiSuccess(200, data, "My orders fetched successfully"))
});

// borrowed history
export const getBorrowedHistory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const date = req.query.date;
  const status = req.query.status;

  let query = {
    owner: _id,
  };

  if(date){
    query.rentDate = date;
  }

  if(status){
    query.status = status;
  }

  const existingUser = await User.findById(query.owner);
  if (!existingUser)
    throw new ApiError(404, "User not found!");


  const borrowedHistory = await Rent.find(query).limit(limit).skip(skip).lean();

  res.status(200).json(new ApiSuccess(200, borrowedHistory, "Borrowed history fetched successfully"))
});
