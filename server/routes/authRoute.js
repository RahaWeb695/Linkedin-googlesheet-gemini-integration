import express from "express";
import {
  googleAuth,
  googleAuthCallback,
  logout,
} from "../controllers/authController.js";
import {
  linkedinAuth,
  linkedinAuthCallback,
} from "../controllers/authController.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleAuthCallback);
router.get("/logout", logout);

router.get("/linkedin", linkedinAuth);
router.get("/linkedin/callback", linkedinAuthCallback);

export default router;
