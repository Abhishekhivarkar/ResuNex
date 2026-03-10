import axios from "axios"

const api = axios.create({
 baseURL:"https://resunex.onrender.com"
})

api.interceptors.request.use((config) => {
 const token = localStorage.getItem("token")

 if(token){
  config.headers.Authorization = `Bearer ${token}`
 }

 return config
})

export const register = async ({userName,email,password}) =>{
 try{
  const response = await api.post("/api/auth/register",{
   userName,email,password
  })

  return response.data
 }catch(err){
  console.log(err.response?.data?.message)
  return null
 }
}

export const login = async ({identifier,password}) =>{
 try{
  const response = await api.post("/api/auth/login",{
   identifier,password
  })


  if(response.data?.token){
   localStorage.setItem("token",response.data.token)
  }

  return response.data
 }catch(err){
  console.log(err.response?.data?.message)
  return null
 }
}

export const logout = async ()=>{
 try{
  const response = await api.post("/api/auth/logout")


  localStorage.removeItem("token")

  return response.data
 }catch(err){
  console.log(err.response?.data?.message)
  return null
 }
}

export const getMe = async ()=>{
 try{
  const response = await api.get("/api/user/me")

  return response.data
 }catch(err){
  console.log(err.response?.data?.message)
  return null
 }
}

export const forgotPassword = async({email}) =>{
 try{
  const response = await api.post("/api/auth/forgot-password",{email})
  
  return response.data
 }catch(err){
  console.log(err)
 }
}

export const resetPassword = async ({token,newPassword, confirmPassword}) =>{
 try{
  const response = await api.post(`/api/auth/reset-password/${token}`,{newPassword,confirmPassword})
  
  return response.data
 }catch(err){
  console.log(err)
 }
}