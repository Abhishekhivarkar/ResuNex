import {useAuth} from "../hooks/useAuth.js"
import {Navigate} from "react-router"
export const Protected = ({children}) =>{
 
 const {loading,user} = useAuth()
 if(loading){
  return <main><p>Loading...</p></main>
 }
 if(!user){
  return <Navigate to="/login" replace/>
 }
 return children
}

export const PublicRoute = ({ children }) => {

 const { loading, user } = useAuth()

 if (loading) {
  return <main><p>Loading...</p></main>
 }

 if (user) {
  return <Navigate to="/" replace />
 }

 return children
}