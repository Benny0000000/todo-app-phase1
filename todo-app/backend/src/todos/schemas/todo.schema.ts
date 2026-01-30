import { z } from 'zod';

export const CreateTodoSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters'),
  description: z.string().optional(),
});

export const UpdateTodoSchema = z.object({
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  description: z.string().optional(),
  isCompleted: z.boolean().optional(),
});