import express from "express";
import { addAddress, updateAddress, updateUser, updateAvatar, getAddress } from "../controllers/Profile.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/address").post(verifyUser, addAddress);
router.route("/address/:id").get(verifyUser, getAddress).patch(verifyUser, updateAddress);

router.patch("/update-user/:id", verifyUser, updateUser);
router.patch("/update-avatar/:id", verifyUser, updateAvatar);

export default router;