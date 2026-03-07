import "../auth.form.scss"
import { useState } from "react"
import {useAuth} from "../hooks/useAuth.js"
export const ForgotPassword = () => {

  const [email,setEmail] = useState("")
 const {loading,handleForgotPassword} = useAuth()
  const onSubmit = (e) =>{
    e.preventDefault()
    handleForgotPassword({email})
  }

if(loading){
 <main><p>Loading...</p></main>
}
  return (
    <main>
      <div className="form-container">

        <h1>Forgot Password</h1>

        <form onSubmit={onSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
            onChange={(e)=>{setEmail(e.target.value)}}
              name="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              
            />

          </div>

          <div>
            <button type="submit" className="button primary-button">
              <div className="top">Send Reset Link</div>
              <div className="bottom"></div>
            </button>
          </div>

        </form>

      </div>
    </main>
  )
}