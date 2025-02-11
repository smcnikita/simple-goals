import { z } from 'zod';

const emailDefinitions = z.string().email({ message: 'Please enter a valid email.' }).trim();

export const SignInSchema = z.object({
  email: emailDefinitions,
  password: z.string().min(8, { message: 'Be at least 8 characters long' }).trim(),
});

export const SignUpSchema = z.object({
  email: emailDefinitions,
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});
