import { z } from 'zod';

export const SignInValidationSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }).email('Email is not valid'),
  password: z.string().trim().min(1, { message: 'Password is required' }).min(4, 'Password should at least be 4 characters long')
})
