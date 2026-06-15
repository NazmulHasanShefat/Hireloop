"use server"
import { serverMutation } from "../core/server"

export const createSubscription = async (data)=>{
    try {
        return serverMutation("/api/subscription", data)
    } catch (error) {
        console.log(error)
    }
}