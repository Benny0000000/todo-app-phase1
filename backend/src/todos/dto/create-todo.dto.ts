import { z } from 'zod';

export const CreateTodoSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters'),
  description: z.string().optional(),
});

export type CreateTodoDto = z.infer<typeof CreateTodoSchema>;