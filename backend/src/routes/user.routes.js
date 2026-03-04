import express from "express"
import {getMeController} from "../controllers/user.controller.js"
import {authMiddleware}from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/me",authMiddleware,getMeController)

export default router