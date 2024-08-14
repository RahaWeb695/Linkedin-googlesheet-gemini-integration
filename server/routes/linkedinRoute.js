import express from "express";
import { createLinkedInPost } from "../controllers/linkedinController.js";

const router = express.Router();

router.post("/create_post", createLinkedInPost);

export default router;
