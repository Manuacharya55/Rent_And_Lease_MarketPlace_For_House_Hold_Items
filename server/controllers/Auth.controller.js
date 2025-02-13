import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password, address, location, avatar } =
    req.body;

  if (
    !name ||
    !email ||
    !phonenumber ||
    !password ||
    !address ||
    !location ||
    !avatar
  ) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, "Already User Exists");
  }

  const user = await User.create({
    name,
    email,
    phonenumber,
    password,
    address,
    location,
    avatar,
  });

  const token = user.generateToken();

  res.cookie("token",token).send({
    success: true,
    data: user,
    token: token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) {
    throw new ApiError(400, "No User Exists");
  }

  const isMatch = await existingUser.isPasswordCorrect(password);

  const token = existingUser.generateToken();

  res.cookie("token",token).send({
    success: true,
    data: existingUser,
    token: token,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password, address, location, avatar } = req.body;
  const { id } = req.params;

  if(id !== req.user._id){
    throw new ApiError(400, "You are not authorized to update this user");
  }
  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new ApiError(400, "No User Exists");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { name, email, phonenumber, password, address, location, avatar },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new ApiError(400, "User update failed");
  }

  const token = updatedUser.generateToken();

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

export const getUserprofile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .populate({
      path: "wishlist",
    })
    .populate({
      path: "products",
    });

  if (!user) {
    throw new ApiError(400, "No User Exists");
  }

  res.send({
    success: true,
    data: user,
  });
});
