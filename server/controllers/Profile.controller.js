import mongoose from "mongoose";
import { Address } from "../models/Address.model.js";
import { User } from "../models/User.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


export const addAddress = asyncHandler(async (req, res) => {
    const { address, lat, lng, country, state, district } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
        throw new ApiError(400, "No User Exists");
    }

    const userAddress = await Address.create({
        user: _id,
        address,
        location: {
            lat,
            lng
        },
        country,
        state,
        district,
    });

    res.status(201).json(new ApiSuccess(201, userAddress, "Address Added Successfully"))
})

export const getAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userAddress = await Address.findById(id);
    res.status(200).json(new ApiSuccess(200, userAddress, "Address Fetched Successfully"))
})

export const updateAddress = asyncHandler(async (req, res) => {
    const { address, location, country, state, district } = req.body;
    const { _id } = req.user;
    const { id } = req.params;;

    const user = await User.findById(_id);

    if (!user) {
        throw new ApiError(400, "No User Exists");
    }

    const userAddress = await Address.findByIdAndUpdate(id, {
        $set: {
            address,
            location,
            country,
            state,
            district,
        }
    }, { new: true, runValidators: true })

    res.status(201).json(new ApiSuccess(201, userAddress, "Address Updated Successfully"))
})

export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, phonenumber } = req.body;
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);

    if (_id != id) {
        throw new ApiError(400, "You are not authorized to update this user");
    }

    if (!user) {
        throw new ApiError(400, "No User Exists");
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
            name,
            email,
            phonenumber,
        }
    }, { new: true, runValidators: true })

    res.status(201).json(new ApiSuccess(201, updatedUser, "User Updated Successfully"))
})

export const updateAvatar = asyncHandler(async (req, res) => {
    const { avatar } = req.body;
    const { _id } = req.user;
    const { id } = req.params;

    const user = await User.findById(_id);

    if (_id != id) {
        throw new ApiError(400, "You are not authorized to update this user");
    }

    if (!user) {
        throw new ApiError(400, "No User Exists");
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
        $set: {
            avatar,
        }
    }, { new: true, runValidators: true })

    res.status(201).json(new ApiSuccess(201, updatedUser, "User Updated Successfully"))
})

export const myProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(_id),
            },
        }, {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                phonenumber: 1,
                avatar: 1
            }
        },
        {
            $lookup: {
                from: "addresses",
                localField: "_id",
                foreignField: "user",
                as: "addresses"
            }
        }
    ]);
    const data = {
        user: user[0],
        addresses: user[0]?.addresses[0]
    }
    // console.log(user)
    console.log(data)
    res.status(200).json(new ApiSuccess(200, data, "User Profile Fetched Successfully"))
})

