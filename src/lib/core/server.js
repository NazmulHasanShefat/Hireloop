"use server"

import { baseUrl } from "@/context/constent"

export const serverMutation = async (apiPath, data, method='POST')=>{
    try {
        const res = await fetch(`${baseUrl}${apiPath}`,{
            method: method,
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