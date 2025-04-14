import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string({ message: "Please provide task title" })
    .min(1, { message: "Please provide task title" }),
  description: z
    .string({ message: "Please provide task description" })
    .min(1, { message: "Please provide task description" }),
  user_id: z.preprocess((val) => {
    const number = Number(val);
    return isNaN(number) ? undefined : number;
  }, z.number({ message: "Please provide a user to assign the task to" }).min(0, { message: "Please provide a valid user to assign the task to" })),
});

export const updateTaskSchema = z.object({
  id: z.number(),
  title: z.string({ message: "Please provide a valid task title" }).optional(),
  description: z.string({ message: "Please provide a valid task description" }).optional(),
  user_id: z
    .preprocess((val) => {
      const number = Number(val);
      return isNaN(number) ? undefined : number;
    }, z.number({ message: "Please provide a user to assign the task to" }).min(0, { message: "Please provide a valid user to assign the task to" }))
    .optional(),
  status: z.enum(["in_progress", "done"]).optional(),
});
