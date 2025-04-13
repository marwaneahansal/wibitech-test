import { z } from "zod";
import { loginSchema } from "@/schemas/loginSchema";
import { API_URL } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";

export const login = async (body: z.infer<typeof loginSchema>) => {
  const data = await fetcher(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
};

export const logout = async () => {
  const data = await fetcher(`${API_URL}/auth/logout`, {
    method: "POST",
  });

  return data;
};
