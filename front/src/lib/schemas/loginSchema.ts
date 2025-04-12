import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ message: "Please provide your username" })
    .min(1, { message: "Please provide your username" }),
  password: z.string({ message: "Please provide your password" }).min(1, {
    message: "Please provide your password",
  }),
});
