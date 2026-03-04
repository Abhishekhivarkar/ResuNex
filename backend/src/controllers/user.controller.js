import UserModel from "../models/User.model.js"

export const getMeController = async (req,res) =>{
 try{
  const user = req.user
  
  if(!user){
   return res.status(404).json({
    success:false,
    message:"User not found"
   })
  }
  
  return res.status(200).json({
   success:true,
   data:{
    username:user.userName,
    email:user.email
   }
  })
 }catch(err){
  console.log("GET ME API ERROR : ", err)
        res.status(500).json({
            success:false,
            message:"Failed to get my data"
        })
 }
}