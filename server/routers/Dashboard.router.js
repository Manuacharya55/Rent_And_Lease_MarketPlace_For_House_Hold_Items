import express from "express";
import {
  productDashboard,
  getRentedProducts,
  returnRentedProduct,
  getAllRents,
  getMyOrders,
} from "../controllers/Dashboard.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.route("/").get(verifyUser, productDashboard);
router.route("/rented").get(verifyUser, getRentedProducts);
router.route("/rented/:id").patch(verifyUser, returnRentedProduct);
router.route("/allrents").get(verifyUser, getAllRents);
router.route("/myorder").get(verifyUser, getMyOrders);

export default router;
