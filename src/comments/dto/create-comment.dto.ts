import { z } from 'zod';

export const createCommentSchema = z.object({
    content: z.string().min(1, { message: 'Content cannot be empty' }),
    postId: z.string().min(1, { message: 'Post ID is required' }),
    userId: z.string().min(1, { message: 'User ID is required' }),
});

export type createCommentSchema = z.infer<typeof createCommentSchema>;

export class CreateCommentDTO implements createCommentSchema {
    content: string;
    postId: string;
    userId: string;
}
