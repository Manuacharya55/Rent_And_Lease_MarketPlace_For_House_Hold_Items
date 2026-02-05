import ApiError from "../utils/ApiError.js";

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    const message = error.errors.map((err) => err.message).join(", ");
    next(new ApiError(400, message));
  }
};
