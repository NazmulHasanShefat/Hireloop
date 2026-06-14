"use server"

import { serverMutation } from "../core/server"

export const postJobApplication = async (formData)=>{
    try {
        return serverMutation("/api/postjobApplication", formData)
    } catch (error) {
        console.log(error)
    }
}