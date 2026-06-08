"use server"
import { baseUrl } from "@/context/constent"

const getCompanyJobs = async (companyId, status="active")=>{
    try {
        const res = fetch(`${baseUrl}/api/get-company-job?companyId=${companyId}&status=${status}`)
        return res.json();
        
    } catch (error) {
        console.log(error)
    }
}