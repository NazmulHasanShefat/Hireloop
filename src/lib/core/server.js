"use server"

import { baseUrl } from "@/context/constent"

export const serverMutation = async (apiPath, data)=>{
    try {
        const res = await fetch(`${baseUrl}${apiPath}`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        return res.json();

    } catch (error) {
        console.log(error)
    }
}

export const serverFetch = async (apiPath, options={})=>{
    try {
        const res = await fetch(`${baseUrl}${apiPath}`);
        return res.json();
        
    } catch (error) {
        console.log(error)
    }
}