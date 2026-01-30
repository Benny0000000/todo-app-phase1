import { z } from 'zod';

export const UpdateTodoSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});

export type UpdateTodoDto = z.infer<typeof UpdateTodoSchema>;