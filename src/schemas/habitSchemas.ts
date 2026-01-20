import { z } from 'zod'

export const createHabitSchema = z.object({
  name: z.string().min(1, 'Habit name is required').max(100, 'Name too long'),
  description: z.string().optional(),
  frequency: z
    .enum(['daily', 'weekly', 'monthly'])
    .refine((val) => ['daily', 'weekly', 'monthly'].includes(val), {
      message: 'Frequency must be daily, weekly, or monthly',
    }),
  targetCount: z.number().int().positive().optional().default(1),
  tagIds: z.array(z.string().uuid()).optional(),
})

export const updateHabitSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
  targetCount: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

export const uuidSchema = z.object({
  id: z.string().uuid('Invalid habit ID format'),
})
export const tagIdSchema = z.object({
  tagId: z.string().uuid('Invalid tag ID format'),
})

export const completeHabitSchema = z.object({
  note: z.string().max(500).optional(),
})

export const addTagsToHabitSchema = z.object({
  tagIds: z.array(z.uuid()).min(1, 'At least one tag ID is required'),
})
