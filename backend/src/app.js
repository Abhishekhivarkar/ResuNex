import mongoose from "mongoose"
import express from "express"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/health",(_,res)=>{
 res.status(200).json({
  success:true,
  status:"OK"
 })
})


export default app