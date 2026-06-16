"use server"

import { serverFetch } from "../core/server"

export const getAllusers = async ()=>{
    try {
        return serverFetch("/api/users");
    } catch (error) {
        console.log(error)
    }
}