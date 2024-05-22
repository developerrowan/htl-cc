import { z } from 'zod';

export default function getLoginValidationSchema() {
  return z.object({
    email: z.string().email('Please enter a valid email.'),
    password: z
      .string()
      .min(10, 'Password should be a minimum of 10 characters.')
      .max(32, 'Password length may not exceed 32 characters.'),
  });
}
