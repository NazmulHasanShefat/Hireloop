"use server"

import { baseUrl } from "@/context/constent"

export const createNewJob = async (newJobData)=>{
    try {
        const res = await fetch(`${baseUrl}/api/create-new-job`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newJobData)
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}