"use server"

import { serverFetch } from "../core/server"

export const getApplicationByApplicant = async(applicantId)=>{
    try {
        return serverFetch(`/api/getjobApplicationByApplicant?applicantId=${applicantId}`)
    } catch (error) {
        console.log(error)
    }
}