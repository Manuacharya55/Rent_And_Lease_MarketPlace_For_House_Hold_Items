import express from "express";
import { getBorrowedHistory, getBorrowedProducts, getMyOrders, updateBorrowedStatus } from "../controllers/Order.controller.js";
import { verifyUser } from "../middlewares/Auth.middleware.js";


const router = express.Router();

router.route("/borrowed/").get(verifyUser, getBorrowedProducts);

router.route("/borrowed/:_id").patch(verifyUser, updateBorrowedStatus);

router.route("/my-orders/").get(verifyUser, getMyOrders);

router.route("/borrowed-history/").get(verifyUser, getBorrowedHistory);

export default router;
