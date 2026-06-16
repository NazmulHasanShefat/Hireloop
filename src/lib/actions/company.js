"use server"

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server"

export const updateCompany = async (id, formData)=>{
    try {
        const updatecompany = serverMutation(`/api/update-company/${id}`, formData, "PATCH");
        revalidatePath("/dashboard/admin/companies")
        return updatecompany;
    } catch (error) {
        console.log(error)
    }
}