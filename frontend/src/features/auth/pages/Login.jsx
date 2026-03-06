import "../auth.form.scss"
import {useNavigate,Link} from "react-router"
import {useAuth} from "../hooks/useAuth.js"
import {useState} from "react"

export const Login = () => {
const navigate = useNavigate()
 const {loading,handleLogin}  = useAuth()
 const [identifier,setIdentifier] = useState("")
 const [password,setPassword] = useState("")

 const handleSubmit =async (e) => {
    e.preventDefault()
    const success = await handleLogin({identifier,password})
    
    if(success){
     navigate("/",{replace:true})
    }
 }

 if(loading){
   return(
    <main><p>Loading...</p></main>
   )
 }

 return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label htmlFor="identifier">Email</label>
              <input
                onChange={(e)=>{setIdentifier(e.target.value)}}
                name="identifier"
                type="text"
                id="identifier"
                placeholder="Enter your email or username"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e)=>{setPassword(e.target.value)}}
                type="password"
                placeholder="Enter password"
                name="password"
                id="password"
              />
            </div>

            <div>
              <button type="submit" className="button primary-button">
                <div className="top">Login</div>
                <div className="bottom"></div>
              </button>
            </div>

          </form>

          <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
          <p><Link to={"/forgot-password"}>Forgot password?</Link></p>
        </div>
      </main>
    </>
  )
}