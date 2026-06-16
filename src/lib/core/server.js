"use server";

import { baseUrl } from "@/context/constent";
import { getUserToken } from "./session";

export const authHeader = async () => {
  try {
    const token = await getUserToken();
    const header = {
      authorization: `Bearer ${token}`,
    };
    return token ? header : {};
  } catch (error) {
    console.log(error);
  }
};

export const serverMutation = async (apiPath, data, method = "POST") => {
  try {
    const res = await fetch(`${baseUrl}${apiPath}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(await authHeader()),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const serverFetch = async (apiPath, options = {}) => {
  try {
    const res = await fetch(`${baseUrl}${apiPath}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const protectedFetch = async (apiPath) => {
  try {
    const res = await fetch(`${baseUrl}${apiPath}`, {
       headers: await authHeader()
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
