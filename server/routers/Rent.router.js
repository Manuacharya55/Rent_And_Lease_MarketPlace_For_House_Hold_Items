import express from "express";
import { processPayment } from "../controllers/rentController.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

// Route to handle rent payments
router.post("/rent-payment",verifyJWT, processPayment);

export default router;
