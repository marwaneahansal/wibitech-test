import { useNavigate } from "react-router";
import { API_URL } from "../constants";
import { z } from "zod";
import { loginSchema } from "../schemas/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  // const { setAuthData } = useBoundStore();

  const handleLogin = async (body: z.infer<typeof loginSchema>) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data);
    }
    return data;
  };

  const mutation = useMutation({
    mutationFn: handleLogin,
    onError: (error: Error) => {
      toast.error("Failed to login", {
        description: error.message || "An error occurred, please try again later",
      });
    },
    onSuccess: (data) => {
      // setAuthData({ user: data.user });
      console.log("success data ==> ", data);
      navigate("/");
    },
  });

  return { mutation };
};
