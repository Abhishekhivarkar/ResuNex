import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:5001",
    withCredentials:true
})

export const interviewReport =async ({selfDescription,jobDescription, resume}) =>{
    try{
        const response = await api.get("/api/interview/report",{selfDescription,jobDescription,resume})


    }catch(err){

    }
}