"use server"
import { serverMutation } from "../core/server"

export const createNewJob = async (newJobData)=>{
    try {
        return serverMutation("/api/create-new-job", newJobData)
    } catch (error) {
        console.log(error)
    }
}