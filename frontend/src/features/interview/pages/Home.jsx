import "../../auth/auth.form.scss"
import "../style/home.scss"
import "../style/interview.scss"
import { useState } from "react"
import { useInterview } from "../hooks/useInterview"


export const Home = () => {

  const {loading,handleInterviewReport} = useInterview()

  const [selfDescription, setSelfDescription] = useState(null)
  const [jobDescription, setJobDescription] = useState(null)
  const [resume, setResume] = useState(null)
  
  if (loading){
    return <main><p>Loading...</p></main>
  }

  const handleForm = async (e) =>{
    e.preventDefault()
    await handleInterviewReport({selfDescription,jobDescription, resume})
  }
  return (
    <main className="home">
  <div className="container">

    <h1>
      Create Your Custom <span>Interview Plan</span>
    </h1>

    <p className="subtitle">
      Our AI analyzes your resume and the job requirements to generate a
      personalized interview preparation strategy.
    </p>

    <div className="interview-input-group">

   
      <div className="card left">

        <div className="card-header">
          <h3>Target Job Description</h3>
          <span className="badge">Required</span>
        </div>

        <p className="helper-text">
          Paste the full job description so the AI can understand the skills,
          responsibilities and technologies required for the role.
        </p>

        <textarea
          placeholder="Example: Senior Frontend Engineer with experience in React, TypeScript and scalable system design..."
          value={jobDescription || ""}
          onChange={(e)=>{setJobDescription(e.target.value)}}
        />

        <small className="counter">0 / 5000 characters</small>

      </div>

     
      <div className="card right">

        <div className="card-header">
          <h3><i style={{
            paddingRight:"1.5rem"

          }}className="fa-regular fa-circle-user"></i>Your Profile</h3>
        </div>

        <p className="helper-text">
          Upload your resume or describe your experience to help the AI analyze
          your background.
        </p>

<div className="upload-box">
  <label className="upload-label">
    <i className="fa-solid fa-cloud-arrow-up"></i>
    <p>Click to upload or drag & drop</p>
    <small>PDF(Max 3MB)</small>

    <input
      type="file"
      accept="application/pdf"
      onChange={(e)=>setResume(e.target.files[0])}
    />
  </label>
</div>
        <div className="divider">OR</div>

        <textarea
        value={selfDescription|| ""}
        onChange={(e)=>{setSelfDescription(e.target.value)}}
          placeholder="Briefly describe your experience, skills, and years of work..."
        />

      </div>

    </div>

    <button onClick ={()=>handleForm}className="generate-btn">
      <i className="fa-solid fa-wand-magic-sparkles"></i>
      Generate My Interview Strategy
    </button>

  </div>
</main>
  )
}