import { type Task } from "./types";

export const tasks: Task[] = [
  {
    id: 1,
    assignedTo: { username: "User-02", id: 2 },
    title: "Task 01",
    description: "This is the description of the first task",
    status: "in_progress",
  },
  {
    id: 2,
    assignedTo: { username: "User-02", id: 2 },
    title: "Task 02",
    description: "This is the description of the second task",
    status: "done",
  },
  {
    id: 3,
    assignedTo: { username: "User-02", id: 2 },
    title: "Task 03",
    description: "This is the description of the third task",
    status: "in_progress",
  },
];
