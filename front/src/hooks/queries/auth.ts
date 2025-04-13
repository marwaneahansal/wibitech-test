import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { login, logout } from "@/api/auth";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const mutation = useMutation({
    mutationFn: login,
    onError: (error: Error) => {
      toast.error("Failed to login", {
        description: error.message || "An error occurred, please try again later",
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
      toast.error("Failed to logout", {
        description: error.message || "An error occurred, please try again later",
      });
    },
    onSuccess: (data) => {
      setAuthData({ user: null, accessToken: null });
      navigate("/login");
      toast.error("Success", {
        description: data.message || "Logout Successful",
      });
    },
  });

  return { mutation };
}
