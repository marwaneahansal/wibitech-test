export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: "admin" | "user";
};

export type Task = {
  id: number;
  assignedTo: Pick<User, "id" | "username">;
  title: string;
  description: string;
  status: "in_progress" | "done";
};
