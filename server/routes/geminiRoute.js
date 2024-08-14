// routes/geminiRoute.js
import express from "express";
import {
  geminiResponseToDatabase,
  generateGeminiContent,
} from "../controllers/geminiController.js";

const router = express.Router();

router.post("/generate_content", generateGeminiContent);
router.post("/gemini_database", geminiResponseToDatabase);

export default router;
