import { z } from "zod";

export const updatePostSchema = z.object({
    title: z.string().min(1, { message: 'Title cannot be empty' }).optional(),
    content: z.string().min(1, { message: 'Content cannot be empty'}).optional(),
    userId: z.string().min(1, { message: 'UserId is required'}).optional(),
});

export type updatePostSchema = z.infer<typeof updatePostSchema>;

export class UpdatePostDTO implements updatePostSchema {
    title?: string;
    content?: string;
    userId?: string;
}
