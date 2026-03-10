import jwt from "jsonwebtoken"
import BlackListTokenModel from "../models/BlackListToken.model.js"
import User from "../models/User.model.js"

export const authMiddleware = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login."
      })
    }

    const token = authHeader.split(" ")[1]

    const blackListToken = await BlackListTokenModel.findOne({ token })

    if (blackListToken) {
      return res.status(403).json({
        success: false,
        message: "Token is blacklisted. Please login again."
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      })
    }

    req.user = user

    next()

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    })
  }
}