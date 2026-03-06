import { PDFParse } from "pdf-parse"
import InterviewReportModel from "../models/InterviewReport.model.js"
import { generateInterviewReport } from "../services/ai.service.js"

export const InterviewReport = async (req,res)=>{
 try{

  if(!req.file){
   return res.status(400).json({
    success:false,
    message:"Resume PDF is required"
   })
  }

  const {selfDescription,jobDescription} = req.body

  if(!selfDescription || !jobDescription){
   return res.status(400).json({
    success:false,
    message:"selfDescription and jobDescription are required"
   })
  }

  // ---------------- PDF PARSE ----------------
  const parser = new PDFParse({
   data:req.file.buffer
  })

  const pdfData = await parser.getText()
  const resumeContent = pdfData?.text || ""

  if(!resumeContent){
   return res.status(400).json({
    success:false,
    message:"Unable to extract resume text"
   })
  }

  // ---------------- AI CALL ----------------
  const aiData = await generateInterviewReport({
   resume:resumeContent,
   selfDescription,
   jobDescription
  })

  console.log("AI RESPONSE:",aiData)

  // ---------------- NORMALIZE TECH QUESTIONS ----------------
  const normalizeTechnical = (arr=[])=>{
   if(!Array.isArray(arr)) return []

   if(typeof arr[0] === "object") return arr

   return arr.map(q=>({
    question:q,
    intention:"Evaluate technical understanding",
    answer:"Explain the concept with practical examples"
   }))
  }

  // ---------------- NORMALIZE BEHAVIORAL ----------------
  const normalizeBehavioral = (arr=[])=>{
   if(!Array.isArray(arr)) return []

   if(typeof arr[0] === "object") return arr

   return arr.map(q=>({
    question:q,
    intention:"Evaluate communication and teamwork",
    answer:"Answer using STAR method"
   }))
  }

  // ---------------- NORMALIZE SKILL GAP ----------------
  const normalizeSkillGap = (arr=[])=>{
   const result=[]

   for(const item of arr){

    if(typeof item === "object"){
     result.push({
      skill:item.skill || "Unknown Skill",
      severity:["LOW","MEDIUM","HIGH"].includes(item.severity)
       ? item.severity
       : "MEDIUM"
     })
    }

    else if(typeof item === "string"){

     const parts=item.split(":")

     if(parts.length===2){

      const skill=parts[0].trim()
      const severity=parts[1].trim().toUpperCase()

      result.push({
       skill,
       severity:["LOW","MEDIUM","HIGH"].includes(severity)
        ? severity
        : "MEDIUM"
      })

     }else{

      result.push({
       skill:item.trim(),
       severity:"MEDIUM"
      })

     }
    }
   }

   return result
  }

  // ---------------- NORMALIZE PREPARATION PLAN ----------------
  const normalizePreparation = (arr=[])=>{
   if(!Array.isArray(arr)) return []

   return arr.map((item,index)=>({
    day:index+1,
    focus:item,
    tasks:[item]
   }))
  }

  // ---------------- APPLY NORMALIZATION ----------------
  const technicalQuestions = normalizeTechnical(aiData?.technicalQuestions)
  const behavioralQuestions = normalizeBehavioral(aiData?.behavioralQuestions)
  const skillGap = normalizeSkillGap(aiData?.skillGap)
  const preparationPlan = normalizePreparation(aiData?.preparationPlan)

  const matchScore = aiData?.matchScore || 0

  // ---------------- SAVE DB ----------------
  const interviewReport = await InterviewReportModel.create({
   user:req.user.id,
   resume:resumeContent,
   selfDescription,
   jobDescription,
   matchScore,
   technicalQuestions,
   behavioralQuestions,
   skillGap,
   preparationPlan
  })

  return res.status(201).json({
   success:true,
   message:"Interview report generated successfully",
   interviewReport
  })

 }catch(err){

  console.error("GENERATE INTERVIEW REPORT ERROR:",err)

  return res.status(500).json({
   success:false,
   message:"Failed to generate interview report"
  })
 }
}