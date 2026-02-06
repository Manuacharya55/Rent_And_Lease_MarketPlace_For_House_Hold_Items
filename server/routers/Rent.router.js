import express from "express";
import { getBookedDates, processPayment } from "../controllers/Rent.controller.js";
import { verifyUser } from "../middlewares/Auth.middleware.js";

const router = express.Router();

// Route to handle rent payments
router.post("/",verifyUser, processPayment);

router.get("/booked-dates/:productId",verifyUser, getBookedDates);

export default router;
