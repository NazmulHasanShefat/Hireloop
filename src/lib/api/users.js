"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { protectedFetch, serverFetch } from "../core/server";

export const getAllusers = async () => {
  try {
    return protectedFetch("/api/users");
  } catch (error) {
    console.log(error);
  }
};

export const getUsersList = async () => {
  try {
    const users = await auth.api.listUsers({
      query: {
        sortBy: "createdAt",
        sortDirection: "desc",
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });
    return users;

  } catch (error) {
    console.log(error);
  }
};
