import express from "express";
import { getBookedDates, processPayment } from "../controllers/rentController.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route to handle rent payments
router.post("/",verifyUser, processPayment);

router.get("/booked-dates/:productId",verifyUser, getBookedDates);

export default router;
