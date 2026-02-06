import { Router } from "express";
import {
  addProductToWishlist,
  listAllWishlist,
  removeProductFromWishlist,
} from "../controllers/Wishlist.controller.js";
import { verifyUser } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/").get(verifyUser, listAllWishlist);

router
  .route("/:id")
  .post(verifyUser, addProductToWishlist)
  .delete(verifyUser, removeProductFromWishlist);

export default router;
