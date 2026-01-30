import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  listAllProducts,
  updateProduct,
} from "../controllers/Product.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").get(verifyUser, listAllProducts).post(verifyUser, addProduct);
router
  .route("/:id")
  .get(verifyUser, getSingleProduct)
  .patch(verifyUser, updateProduct)
  .delete(verifyUser, deleteProduct);

export default router;
