import "../auth.form.scss"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth.js"

export const ForgotPassword = () => {

  const [email,setEmail] = useState("")
  const [emailSent,setEmailSent] = useState(false)

  const {loading,handleForgotPassword} = useAuth()

  const onSubmit = async (e) =>{
    e.preventDefault()

    const data = await handleForgotPassword({email})

    if(data?.success){
      setEmailSent(true)
    }
  }

  if(loading){
    return <main><p>Loading...</p></main>
  }

  return (
    <main>
      <div className="form-container">

        {!emailSent ? (
          <>
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
          </>
        ) : (

          <div className="email-success">

            <h2>Check your email</h2>

            <p>
              We have sent a password reset link to
            </p>

            <p className="email-highlight">
              {email}
            </p>

            <p className="small-text">
              Please check your inbox (and spam folder).
            </p>

          </div>

        )}

      </div>
    </main>
  )
}