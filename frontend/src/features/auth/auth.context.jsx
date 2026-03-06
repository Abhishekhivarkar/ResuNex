import {createContext,useState} from "react"
import {useEffect} from "react"
import {getMe} from "./services/auth.api.js"
export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

 const [user,setUser] = useState(null)
 const [loading,setLoading] = useState(true)

useEffect(()=>{
 const getAndsetUser = async () =>{
  const data = await getMe()
  if(data && data.user){
   setUser(data.user)
  }
  setLoading(false)
 }
 
 getAndsetUser()
},[])
 return (
  <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
   {children}
  </AuthContext.Provider>
 )
}