import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3),
});
