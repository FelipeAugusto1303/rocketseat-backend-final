import { z } from 'zod';

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserBodySchema = z.infer<typeof UserLoginSchema>;
