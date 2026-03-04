import mongoose from "mongoose"

const BlackListTokenSchema = new mongoose.Schema({
 token:{
  required:true,
  unique:true,
  type:String
 }
},{timestamps:true})

export default mongoose.model("blackListToken",BlackListTokenSchema)