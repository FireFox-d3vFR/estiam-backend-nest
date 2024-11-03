import { z } from 'zod';

export const updateCommentSchema = z.object({
  content: z.string().min(1, { message: 'Content cannot be empty' }).optional(),
  postId: z.string().min(1, { message: 'Post ID is required' }).optional(),
  userId: z.string().min(1, { message: 'User ID is required' }).optional(),
});

export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;

export class UpdateCommentDTO implements UpdateCommentSchema {
  content?: string;
  postId?: string;
  userId?: string;
}
