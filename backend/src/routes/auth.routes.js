import express from "express"
import { register, login, logout ,forgotPassword, resetPassword} from "../controllers/auth.controller.js"
import { validate } from "../middlewares/validate.middleware.js"
import { registerSchema, loginSchema ,resetPasswordSchema} from "../validators/auth.validator.js"

const router = express.Router()

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/logout", logout)

router.post("/forgot-password",forgotPassword)

router.post(
  "/reset-password/:token",
  validate(resetPasswordSchema),
  resetPassword
)
export default router