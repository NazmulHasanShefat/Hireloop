"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user || null;
  } catch (error) {
    console.log(error);
  }
};

export const requireRole = async (userRole) => {
  let shouldRedirect = false;
  try {
    const user = await getUserSession();
    if(!user){
        redirect("/sign-in")
    }
    if (user?.role !== userRole) {
      shouldRedirect = true;
    }
  } catch (error) {
    console.log(error);
    shouldRedirect = true;
  }
  if (shouldRedirect) {
    return redirect("/unauthorized"); // বানান ঠিক করা হয়েছে (unauthrized -> unauthorized)
  }
};
