import { useContext } from "react"
import { AuthContext } from "../auth.context.jsx"
import { resetPassword, forgotPassword, login, register, logout, getMe } from "../services/auth.api.js"

export const useAuth = () => {

 const context = useContext(AuthContext)
 const { user, setUser, loading, setLoading } = context


 const handleLogin = async ({ identifier, password }) => {
  try {
   setLoading(true)

   const data = await login({ identifier, password })

   if (data && data.user) {
    setUser(data.user)
    return true
   }
return false
  } catch (err) {
   console.log(err)
  } finally {
   setLoading(false)
  }
 }


 const handleRegister = async ({ userName, email, password }) => {
  try {

   setLoading(true)

   const data = await register({ userName, email, password })

   if (data && data.user) {
    setUser(data.user)
   }

  } catch (err) {
   console.log(err)
  } finally {
   setLoading(false)
  }
 }


 const handleLogout = async () => {

  try {

   setLoading(true)

   await logout()

   setUser(null)

  } catch (err) {
   console.log(err)

  } finally {

   setLoading(false)

  }
 }


 const handleForgotPassword = async ({ email }) => {

  try {

   setLoading(true)

   const data = await forgotPassword({ email })

   return data

  } catch (err) {
   console.log(err)
  } finally {
   setLoading(false)
  }

 }


 const handleResetPassword = async ({ token, newPassword, confirmPassword }) => {

  try {

   setLoading(true)

   const data = await resetPassword({ token, newPassword, confirmPassword })

   return data

  } catch (err) {

   console.log(err)

  } finally {

   setLoading(false)

  }

 }


 return {
  user,
  loading,
  handleLogin,
  handleLogout,
  handleRegister,
  handleForgotPassword,
  handleResetPassword
 }

}