"use server"
import { baseUrl } from "@/context/constent"

export const getCompanyJobs = async (companyId, status="active")=>{
    try {
        const res = await fetch(`${baseUrl}/api/companyjob?companyId=${companyId}&status=${status}`)
        return res.json();
    } catch (error) {
        console.log(error)
    }
}