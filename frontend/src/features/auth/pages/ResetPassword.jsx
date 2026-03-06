import "../auth.form.scss"
import { useState } from "react"
import {useAuth} from "../hooks/useAuth.js"
import {useParams,useNavigate} from "react-router"

export const ResetPassword = () => {

 const {token} = useParams()
 const navigate = useNavigate()

 const {loading,handleResetPassword} = useAuth()

 const [newPassword,setNewPassword] = useState("")
 const [confirmPassword,setConfirmPassword] = useState("")

 const handleSubmit = async (e)=>{
  e.preventDefault()

  // validation pehle
  if(newPassword !== confirmPassword){
   alert("Passwords do not match")
   return
  }

  const data = await handleResetPassword({
   token,
   newPassword,
   confirmPassword
  })

  // success hone par redirect
  if(data?.success){
   alert("Password reset successful")
   navigate("/login")
  }
 }

 if(loading){
  return <main><p>Loading...</p></main>
 }

 return (
  <main>
   <div className="form-container">

    <h1>Reset Password</h1>

    <form onSubmit={handleSubmit}>

     <div className="input-group">
      <label htmlFor="newPassword">New Password</label>

      <input
       type="password"
       id="newPassword"
       placeholder="Enter new password"
       onChange={(e)=>setNewPassword(e.target.value)}
      />
     </div>

     <div className="input-group">
      <label htmlFor="confirmPassword">Confirm Password</label>

      <input
       type="password"
       id="confirmPassword"
       placeholder="Confirm new password"
       onChange={(e)=>setConfirmPassword(e.target.value)}
      />
     </div>

     <button type="submit" className="button primary-button">
      <div className="top">Reset Password</div>
      <div className="bottom"></div>
     </button>

    </form>

   </div>
  </main>
 )
}