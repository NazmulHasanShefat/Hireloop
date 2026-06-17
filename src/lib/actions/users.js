"use server"

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import { headers } from "next/headers";

export const updateUser = async (userId, userRole) => {
    const data = await auth.api.setRole({
      body: {
        userId: userId,
        role: userRole, // required
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    revalidatePath("/dashboard/admin/users")
    return data;  
};
