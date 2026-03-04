import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
const userSchema = new mongoose.Schema({
 userName:{
  required:true,
  unique:true,
  type:String
 },
 email:{
  required:true,
  unique:true,
  type:String,
  lowercase:true,
  trim:true,
  match:[
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    "Please use a valid email address"
  ]
 },
 password:{
  required:true,
  type:String,
  select:false
 },
 resetPasswordToken:{
  type:String
 },
 resetPasswordExpire:{
  type:Date
 }
},{timestamps:true})

userSchema.pre("save",async function(){
 if(!this.isModified("password")){
  return
 }
 
 const hash = await bcryptjs.hash(this.password,10)
 
 this.password = hash
 return
})

userSchema.methods.comparePassword = async function(enteredPassword){
return await bcryptjs.compare(enteredPassword,this.password)
}

export default mongoose.model("User",userSchema)