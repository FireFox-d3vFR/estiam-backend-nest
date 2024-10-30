import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export class LoginDTO implements LoginSchema {
  username: string;
  password: string;
}