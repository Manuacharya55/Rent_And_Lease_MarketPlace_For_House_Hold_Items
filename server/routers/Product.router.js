import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getSingleProduct,
  listAllProducts,
  myProducts,
  updateProduct,
} from "../controllers/Product.controller.js";
import { verifyUser } from "../middlewares/Auth.middleware.js";
const router = Router();

router.route("/").get(verifyUser, listAllProducts).post(verifyUser, addProduct);
router.route("/my-products").get(verifyUser, myProducts);
router.route("/my-products/:id").get(verifyUser, getProductById);
router
  .route("/:id")
  .get(verifyUser, getSingleProduct)
  .patch(verifyUser, updateProduct)
  .delete(verifyUser, deleteProduct);

export default router;
