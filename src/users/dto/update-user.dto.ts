import { z } from "zod";

export const updateUserSchema =  z.object({
    username: z.string().min(1).optional(),
    
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
