import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { login, logout } from "@/api/auth";
import { ApiError } from "@/lib/fetcher";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error: Error) => {
      let errorMessage = error.message;
      if (error instanceof ApiError) {
        errorMessage = error.data.message!;
      }
      toast.error("Error", {
        description: errorMessage || "Something went wrong while login in, please try again later",
      });
    },
    onSuccess: (data) => {
      setAuthData({ user: data.user, accessToken: data.access_token });
      navigate("/tasks");
    },
  });

  return { mutation };
};

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const mutation = useMutation({
    mutationFn: logout,
    onError: (error: Error) => {
      let errorMessage = error.message;
      if (error instanceof ApiError) {
        if (error.status === 401) {
          setAuthData({ user: null, accessToken: null });
          navigate("/login");
        }
        errorMessage = error.data.message!;
      }

      toast.error("Error", {
        description: errorMessage || "Something went wrong while login out, please try again later",
      });
    },
    onSuccess: (data) => {
      setAuthData({ user: null, accessToken: null });
      navigate("/login");
      toast.success("Success", {
        description: data.message || "Logout Successful",
      });
    },
  });

  return { mutation };
};
