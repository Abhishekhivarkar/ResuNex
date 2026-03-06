import {useNavigate,Link} from "react-router"
import {useAuth} from "../hooks/useAuth.js"
import {useState} from "react"
export const Register = () => {

const {loading,handleRegister} = useAuth()
const [userName,setUserName] = useState("")
const [email,setEmail] = useState("")
const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    handleRegister({userName,email,password})
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
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input onChange={(e)=>{setUserName(e.target.value)}} name="userName" type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input onChange={(e) => {setEmail(e.target.value)}} name="email" type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input onChange={(e) =>{setPassword(e.target.value)}} type="password" placeholder="Enter password" name="password" id="password" />
            </div>
            <div>
              <button type="submit" className="button primary-button">
                <div className="top">Register</div>
                <div className="bottom"></div>
              </button>
            </div>
          </form>
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </div>
      </main>
    </>
  )
}

