import { authMiddleware } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/upload.middleware.js"
import { getAllReports, getReportById, InterviewReport } from "../controllers/interviewReport.controller.js";
import express from "express"

const router = express.Router()

router.post("/report",authMiddleware,upload.single("resume"),InterviewReport)

router.get("/report/all",authMiddleware,getAllReports)
router.get("/report/:interviewId",authMiddleware,getReportById)
export default router
