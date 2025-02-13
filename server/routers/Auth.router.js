import { Router } from "express";
import {
  getUserprofile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/Auth.controller.js";

import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile/:id").get(getUserprofile).patch(verifyJWT,updateUserProfile);

export default router;
