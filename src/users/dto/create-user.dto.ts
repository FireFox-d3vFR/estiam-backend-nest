import { z } from "zod";

const passwordValidation = new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/);

export const createUserSchema = z.object({
    username: z.string().min(1),
    password: z.string().regex(passwordValidation, {
        message: "Error password no conform"
    }),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
