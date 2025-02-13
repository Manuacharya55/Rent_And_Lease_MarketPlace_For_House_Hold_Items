import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  listAllProducts,
  updateProduct,
} from "../controllers/Product.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();

router.route("/").get(verifyJWT, listAllProducts).post(verifyJWT, addProduct);
router
  .route("/:id")
  .get(verifyJWT,getSingleProduct)
  .patch(verifyJWT,updateProduct)
  .delete(verifyJWT,deleteProduct);

export default router;
