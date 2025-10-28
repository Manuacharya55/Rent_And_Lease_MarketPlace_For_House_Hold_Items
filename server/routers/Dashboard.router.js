import express from "express";
import {
  productDashboard,
  getRentedProducts,
  returnRentedProduct,
  getAllRents,
  getMyOrders,
} from "../controllers/Dashboard.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.route("/").get(verifyJWT, productDashboard);
router.route("/rented").get(verifyJWT, getRentedProducts);
router.route("/rented/:id").patch(verifyJWT, returnRentedProduct);
router.route("/allrents").get(verifyJWT, getAllRents);
router.route("/myorder").get(verifyJWT, getMyOrders);

export default router;
