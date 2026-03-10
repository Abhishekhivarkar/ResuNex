import axios from "axios";

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

export const interviewReport = async ({selfDescription,jobDescription, resume}) =>{
    try{

        const formData = new FormData()
        formData.append("jobDescription", jobDescription)
        formData.append("selfDescription", selfDescription)
        formData.append("resume", resume)

        const response = await api.post("/api/interview/report",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })

        return response.data
        
    }catch(err){
        console.log(err)
    }
}

export const getAllReports = async ()=>{
    try{
        const response = await api.get("/api/interview/report/all")
        return response.data
    }catch(err){
        console.log(err)
    }  
}

export const getReportById = async (interviewId)=>{
    try{
        const response = await api.get(`/api/interview/report/${interviewId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}