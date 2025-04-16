import { API_URL } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { type User } from "@/lib/types";
import { createTaskSchema, updateTaskSchema } from "@/schemas/taskSchema";
import { z } from "zod";

export const getTasks = async ({
  page,
  searchQuery,
  statusQuery,
}: {
  page: number;
  searchQuery: string;
  statusQuery: string;
}) => {
  const data = await fetcher(
    `${API_URL}/tasks?page=${page}&search=${searchQuery}&status=${statusQuery}`
  );

  return data;
};

export const getUsers = async (): Promise<Pick<User, "id" | "username">[]> => {
  const data = await fetcher(`${API_URL}/users`);

  return data;
};

export const createTask = async (body: z.input<typeof createTaskSchema>) => {
  const data = await fetcher(`${API_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return data;
};

export const updateTask = async ({ id, ...body }: z.input<typeof updateTaskSchema>) => {
  const data = await fetcher(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

  return data;
};

export const deleteTask = async ({ id }: { id: number }) => {
  const data = await fetcher(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  return data;
};
