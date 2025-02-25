import { Router } from "express";
import {
  getmyprofile,
  getUserprofile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/Auth.controller.js";

import { verifyJWT } from "../middlewares/Auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/myprofile",verifyJWT, getmyprofile);
router.route("/profile/:id").get(getUserprofile).patch(verifyJWT,updateUserProfile);

export default router;
