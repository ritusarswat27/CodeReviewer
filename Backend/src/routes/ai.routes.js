import express from "express";
import rateLimit from "express-rate-limit";
import { getResponse } from "../controllers/ai.controller.js";

const router = express.Router();

const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 15, // free tier ke 20 se thoda kam rakho, buffer ke liye
  message: { error: "Daily review limit reached. Please try again tomorrow." },
});

router.post("/get-review", getResponse);

export default router;