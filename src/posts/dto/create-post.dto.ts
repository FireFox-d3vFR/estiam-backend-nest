import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }),
    content: z.string().min(1, { message: 'Content cannot be empty'}),
    userId: z.string().min(1, { message: 'UserId is required'}),
});

export type createPostSchema = z.infer<typeof createPostSchema>

export class CreatePostDTO implements createPostSchema {
    title: string;
    content: string;
    userId: string;
}
