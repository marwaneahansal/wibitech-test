import { createTask, deleteTask, getTasks, getUsers, updateTask } from "@/api/tasks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTasksQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onError: (error: Error) => {
      toast.error("Failed to create the task", {
        description: error.message || "An error occurred, please try again later",
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

  const mutation = useMutation({
    mutationFn: updateTask,
    onError: (error: Error) => {
      toast.error("Failed to update the task", {
        description: error.message || "An error occurred, please try again later",
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

  const mutation = useMutation({
    mutationFn: deleteTask,
    onError: (error: Error) => {
      toast.error("Failed to delete the task", {
        description: error.message || "An error occurred, please try again later",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Success", {
        description: data.message || "Task deleted successfully",
      });
    },
  });

  return { mutation };
};
