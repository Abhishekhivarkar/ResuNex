import User from "../models/User.model.js";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import {sendResetPasswordMail} from "../services/mail.service.js"
import BlackListTokenModel from "../models/BlackListToken.model.js"
import {config} from "../configs/env.config.js"
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      userName: user.userName
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}


export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body

    const existingUser = await User.findOne({
      $or: [{ email }, { userName }]
    })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    const user = await User.create({
      userName,
      email,
      password
    })

    const token = generateToken(user)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.userName,
        email: user.email
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const  login = async (req, res) => {
  try {
    const { identifier, password } = req.body

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { userName: identifier }
      ]
    }).select("+password")

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    const token = generateToken(user)

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      message: " successful",
      user: {
        id: user._id,
        username: user.userName,
        email: user.email
      },
      token
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const logout = async (req, res) => {
  try {

    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]

    if (token) {
      await BlackListTokenModel.create({ token })
    }

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0)
    })

    res.status(200).json({
      message: "Logged out successfully"
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const forgotPassword =async (req,res) =>{
 try{
  const {email} = req.body
  const user =await User.findOne({email})
  
  if(!user){
   return res.status(404).json({
    success:false,
    message:"Email not found"
   })
  }
  
  if(user.isEmailVerified === false){
    return res.status(400).json({
        succcess:false,
        message:"Email is not verified please verify email first!"
    })
  }
  const resetToken = crypto.randomBytes(32).toString("hex")
  
  user.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex")
  
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000 

  await user.save({validateBeforeSave:false})
  const resetPasswordUrl = `${config.CLIENT_URL}/reset-password/${resetToken}`
  await sendResetPasswordMail(email,resetPasswordUrl,user.firstName,user.lastName)
  
 return res.status(200).json({
  success:true,
  message:"Reset password mail send successfully!"
 })
 }catch(err){
  console.log("FORGOT PASSWORD API ERROR :", err)
  res.status(500).json({
    success:false,
    message:"Failed to send forgot password mail"
  })
 }
}




export const resetPassword =async (req,res)=>{
    try{
        const {token} = req.params
        const {newPassword,confirmPassword} = req.body

       

        const hashToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex")

        const user = await User.findOne({
            resetPasswordToken:hashToken,
            resetPasswordExpire:{$gt:Date.now()}
        })

        if(!user){
            return res.status(404).json({
                success:false,
                message:"Reset password token is invalid or expired!"
            })
        }

      
        user.password = confirmPassword
        user.resetPasswordExpire = null
        user.resetPasswordToken = null

        await user.save()

        return res.status(200).json({
            success:true,
            message:"Password reset successfully"
        })
    }catch(err){
        console.log("RESET PASSWORD API ERROR : ", err)
        res.status(500).json({
            success:false,
            message:"Failed to reset password"
        })
    }
}