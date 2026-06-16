"use server"
// import { baseUrl } from "@/context/constent"
import { serverFetch, serverMutation } from './../core/server';
import { getUserSession } from '../core/session';

export const createCompany = async (companyData)=>{
    try {
        return await serverMutation("/api/createcompany", companyData)
    } catch (error) {
        console.log(error)
    }
}

export const getRecruiterCompany = async (recruiterId)=>{
    try {
         return serverFetch(`/api/recruiter-company?recruiterId=${recruiterId}`)
    } catch (error) {
        console.log(error)
    }
}

export const getLogdinRecruiterCompany = async ()=>{
    try {
        const user = await getUserSession();
        return getRecruiterCompany(user?.id);

    } catch (error) {
        console.log(error)
    }
}

export const getAllcompanies = async()=>{
    try {
        return serverFetch("/api/companys");
    } catch (error) {
        console.log(error)
    }
}