import { Router } from "express";
import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/Review.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/:id").post(verifyUser, addComment);

router
  .route("/:id/:commentId")
  .patch(verifyUser, editComment)
  .delete(verifyUser, deleteComment);

export default router;
