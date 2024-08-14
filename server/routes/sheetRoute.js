import express from "express";
import {
  getSheetData,
  getSheetId,
  // getSheetIdfromDatabase,
} from "../controllers/sheetController.js";

const router = express.Router();

router.post("/data", getSheetData);
router.post("/sheet_id", getSheetId);
// router.post("/getSheetId", getSheetIdfromDatabase);

export default router;
