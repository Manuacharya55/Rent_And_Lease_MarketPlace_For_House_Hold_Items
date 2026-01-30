import { User } from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phonenumber, password, avatar } =
    req.body;

  if (
    !name ||
    !email ||
    !phonenumber ||
    !password
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
    avatar,
  });

  const token = user.generateToken();

  const data = {
    user: user,
    token: token
  }
  res.cookie("token", token).json(new ApiSuccess(200, data, "User Registered Successfully"));
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

  const data = {
    user: existingUser,
    token: token
  }
  res.cookie("token", token).json(new ApiSuccess(200, data, "User Logged In Successfully"));
});

