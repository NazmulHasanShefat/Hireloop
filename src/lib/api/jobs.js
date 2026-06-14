"use server"
import { baseUrl } from "@/context/constent"
import { serverFetch } from "../core/server";

export const getCompanyJobs = async (companyId, status="active")=>{
    try {
        const res = await fetch(`${baseUrl}/api/companyjob?companyId=${companyId}&status=${status}`)
        return res.json();
        } catch (error) {
        console.log(error)
    }
}
export const getRecruiterJobs = async (recruiterId) => {
    try {
        return serverFetch(`/api/get-recruiter-jobs?recruiterId=${recruiterId}`)
    } catch (error) {
        console.log(error)
    }
}