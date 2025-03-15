import { z } from 'zod';

export const UserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
});

export type CreateUserBodySchema = z.infer<typeof UserFormSchema>;
