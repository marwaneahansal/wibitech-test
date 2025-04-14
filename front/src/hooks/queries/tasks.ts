import { getTasks } from "@/api/tasks";
import { useQuery } from "@tanstack/react-query";

export const useTasksQuery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  return { data, isLoading, isError };
};
