"use server"

import { protectedFetch } from "../core/server"

export const getApplicationByApplicant = async(applicantId)=>{
    try {
        return protectedFetch(`/api/getjobApplicationByApplicant?applicantId=${applicantId}`)
    } catch (error) {
        console.log(error)
    }
}