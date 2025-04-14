import { API_URL } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";

export const getTasks = async () => {
  const data = await fetcher(`${API_URL}/tasks`);

  return data;
};