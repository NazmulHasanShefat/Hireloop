"use server"
import { serverFetch } from "../core/server"

export const getPlanById = async (planId)=>{
    try {
        return serverFetch(`/api/plans?planId=${planId}`);
    } catch (error) {
        console.log(error)
    }
}
export const getPlans = async ()=>{
    try {
        return serverFetch("/api/plans");
    } catch (error) {
        console.log(error)
    }
}