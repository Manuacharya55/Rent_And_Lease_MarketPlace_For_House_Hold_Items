import { Router } from "express";
import {
  addComment,
  editComment,
  deleteComment,
} from "../controllers/Review.controller.js";
import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/:id").post(verifyJWT, addComment);

router
  .route("/:id/:commentId")
  .patch(verifyJWT, editComment)
  .delete(verifyJWT, deleteComment);

export default router;
