import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyJWT = asyncHandler((req, res, next) => {
  try {
    const token = req.header("auth-token") || req.cookies.token;
    if (!token) {
      return res.send(new ApiError(400, "No Token found"));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    throw new ApiError(401, error.message, "Invalid Token");
  }
  next();
});

