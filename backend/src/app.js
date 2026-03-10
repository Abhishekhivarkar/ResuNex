import mongoose from "mongoose"
import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import generateInterviewReportRoutes from "./routes/interviewReport.routes.js"
import { config } from "./configs/env.config.js"
const app = express()

app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/interview", generateInterviewReportRoutes)

app.use("/health",(_,res)=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})


export default app