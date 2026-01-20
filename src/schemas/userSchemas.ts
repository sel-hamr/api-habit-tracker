import z from 'zod'

export const getUserSchema = z.object({
  id: z.uuid('Invalid user ID format'),
})

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username too long')
    .optional(),
  email: z.email('Invalid email format').optional(),
  firstName: z.string().max(50, 'First name too long').optional(),
  lastName: z.string().max(50, 'Last name too long').optional(),
})
