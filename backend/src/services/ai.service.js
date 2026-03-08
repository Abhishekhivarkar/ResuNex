import Groq from "groq-sdk"
import { z } from "zod"
import puppeteer from "puppeteer"
import { config } from "../configs/env.config.js"

const groq = new Groq({
 apiKey: config.GROQ_API_KEY
})


const interviewReportSchema = z.object({
 matchScore: z.number(),

 technicalQuestions: z.array(
  z.object({
   question: z.string(),
   intention: z.string(),
   answer: z.string()
  })
 ),

 behavioralQuestions: z.array(
  z.object({
   question: z.string(),
   intention: z.string(),
   answer: z.string()
  })
 ),

 skillGap: z.array(
  z.object({
   skill: z.string(),
   severity: z.enum(["LOW","MEDIUM","HIGH"])
  })
 ),

 preparationPlan: z.array(
  z.object({
   day: z.number(),
   focus: z.string(),
   tasks: z.array(z.string())
  })
 ),

 title: z.string()
})


export async function generateInterviewReport({
 resume,
 selfDescription,
 jobDescription
}){

 const prompt = `
You are an AI interview preparation assistant.

Return ONLY valid JSON.

Structure:

{
 "title":string,
 "matchScore":number,
 "technicalQuestions":[
  {
   "question":string,
   "intention":string,
   "answer":string
  }
 ],
 "behavioralQuestions":[
  {
   "question":string,
   "intention":string,
   "answer":string
  }
 ],
 "skillGap":[
  {
   "skill":string,
   "severity":"LOW|MEDIUM|HIGH"
  }
 ],
 "preparationPlan":[
  {
   "day":number,
   "focus":string,
   "tasks":[string]
  }
 ]
}

Generate:
- 5 technical questions
- 3 behavioral questions
- 5 skill gaps
- 7 day preparation plan

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`

const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  temperature: 0.2,
  messages: [
    {
      role: "user",
      content: prompt
    }
  ]
})

const text = response.choices[0].message.content


const cleaned = text
 .replace(/```json/g,"")
 .replace(/```/g,"")
 .trim()

const json = JSON.parse(cleaned)

return interviewReportSchema.parse(json)
}



async function generatePdfFromHtml(htmlContent){

 const browser = await puppeteer.launch()

 const page = await browser.newPage()

 await page.setContent(htmlContent,{
  waitUntil:"networkidle0"
 })

 const pdfBuffer = await page.pdf({
  format:"A4",
  margin:{
   top:"20mm",
   bottom:"20mm",
   left:"15mm",
   right:"15mm"
  }
 })

 await browser.close()

 return pdfBuffer
}



export async function generateResumePdf({
 resume,
 selfDescription,
 jobDescription
}){

 const prompt = `
Generate an ATS friendly resume in HTML format.

Candidate Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return ONLY JSON:

{
 "html":string
}

The HTML should:
- be well structured
- be ATS friendly
- be clean and professional
- fit within 1-2 pages
`

 const response = await groq.chat.completions.create({
  model:"llama3-70b-8192",
  temperature:0.3,
  messages:[
   {
    role:"user",
    content:prompt
   }
  ]
 })

 const text = response.choices[0].message.content

 const json = JSON.parse(text)

 const pdfBuffer = await generatePdfFromHtml(json.html)

 return pdfBuffer
}