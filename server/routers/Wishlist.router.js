import { Router } from "express";
import {
  addProductToWishlist,
  listAllWishlist,
  removeProductFromWishlist,
} from "../controllers/Wishlist.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";
const router = Router();

router.route("/").get(verifyJWT, listAllWishlist);

router
  .route("/:id")
  .post(verifyJWT, addProductToWishlist)
  .delete(verifyJWT, removeProductFromWishlist);

export default router;
