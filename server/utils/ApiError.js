export class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", errors = []) {
    super(message); // Call the parent constructor with the message
    this.statusCode = statusCode;
    this.message = message; // Redundant assignment removed
    this.data = null; // No need to explicitly set to null
    this.success = false; // No need to explicitly set to false
    this.errors = errors;

    // Ensure proper stack trace generation
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
