import mongoose from "mongoose"


const technicalQuestionSchema = new mongoose.Schema({
 
 question:{
  type:String,
  required:true
 },
 intention:{
  type:String,
  required:true
 },
 answer:{
  type:String,
  required:true
 }
},
{_id:false})

const behavioralQuestionSchema = new mongoose.Schema({
 question:{
  type:String,
  required:true
 },
 intention:{
  type:String,
  required:true
 },
 answer:{
  type:String,
  required:true
 }
},{_id:false})


const skillGapSchema = new mongoose.Schema({
 skill:{
  required:true,
  type:String
 },
 severity:{
  required:true,
  type:String,
  enum:["LOW","MEDIUM","HIGH"],
  default:"LOW"
 }
},{_id:false})


const preparationPlanSchema = new mongoose.Schema({
 day:{
  type:Number,
  required:true
 },
 focus:{
  type:String,
  required:true
 },
 tasks:[{
  type:String,
  required:true
 }]
})
const interviewReportSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  jobDescription:{
   required:true,
   type:String
  },
  
  resume:{
   type:String
  },
  
  selfDescription:{
   type:String
  },
  
  matchScore:{
   min:0,
   max:100,
   type:Number
  },
  
  technicalQuestions:[technicalQuestionSchema],
  skillGap:[skillGapSchema],
  behavioralQuestions:[behavioralQuestionSchema],
  preparationPlan:[preparationPlanSchema]
},{timestamps:true})

export default mongoose.model("interviewReport",interviewReportSchema)