import { Router } from "express";
import {
  addComment,
  editComment,
  deleteComment,
  getAllComments,
} from "../controllers/Review.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:productId").get(verifyUser,getAllComments).post(verifyUser, addComment);

router
  .route("/:productId/:commentId")
  .patch(verifyUser, editComment)
  .delete(verifyUser, deleteComment);

export default router;
