import { createTask, deleteTask, getTasks, getUsers, updateTask } from "@/api/tasks";
import { ApiError } from "@/lib/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "../use-auth";
import { useNavigate, useSearchParams } from "react-router";

export const useTasksQuery = ({ page }: { page: number }) => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["tasks", page],
    queryFn: async () => {
      try {
        return await getTasks({ page });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            setAuthData({ user: null, accessToken: null });
            navigate("/login");
          }
          throw new Error(error.data.message);
        }
        throw new Error(error as string);
      }
    },
  });
};

export const useUsersQuery = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        return await getUsers();
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            setAuthData({ user: null, accessToken: null });
            navigate("/login");
          }
          throw new Error(error.data.message);
        }
        throw new Error(error as string);
      }
    },
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createTask,
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
        description:
          errorMessage || "Something went wrong while creating this task, please try again later",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Success", {
        description: data.message || "Task created successfully",
      });
    },
  });

  return { mutation };
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateTask,
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
        description:
          errorMessage || "Something went wrong while updating this task, please try again later",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Success", {
        description: data.message || "Task updated successfully",
      });
    },
  });

  return { mutation };
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();
  const { setAuthData } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: deleteTask,
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
        description:
          errorMessage || "Something went wrong while deleting this task, please try again later",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      searchParams.set("page", "1");
      setSearchParams(searchParams);
      toast.success("Success", {
        description: data.message || "Task deleted successfully",
      });
    },
  });

  return { mutation };
};
