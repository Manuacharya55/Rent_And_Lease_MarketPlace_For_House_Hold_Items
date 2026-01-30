import express from "express";
import { processPayment } from "../controllers/rentController.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to handle rent payments
router.post("/rent-payment",verifyUser, processPayment);

export default router;
