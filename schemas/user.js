import z from 'zod';

const userSchema = z.object({
  name: z.string().min(3).max(20).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export default userSchema;