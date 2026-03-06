import { authMiddleware } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/upload.middleware.js"
import { InterviewReport } from "../controllers/interviewReport.controller.js";
import express from "express"

const router = express.Router()

router.post("/report",authMiddleware,upload.single("resume"),InterviewReport)

export default router
