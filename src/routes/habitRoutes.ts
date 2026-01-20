import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { authenticatedToken } from '../middleware/auth.ts'
import {
  completeHabit,
  createHabit,
  deleteHabit,
  getHabitById,
  getUserHabits,
  updateHabits,
} from '../controllers/habitController.ts'

import {
  createHabitSchema,
  updateHabitSchema,
  uuidSchema,
  completeHabitSchema,
} from '../schemas/habitSchemas.ts'

const router = Router()

router.use(authenticatedToken)

router.get('/', getUserHabits)

router.get('/:id', validateParams(uuidSchema), getHabitById)

router.post('/', validateBody(createHabitSchema), createHabit)

router.put(
  '/:id',
  validateParams(uuidSchema),
  validateBody(updateHabitSchema),
  updateHabits,
)

router.delete('/:id', validateParams(uuidSchema), deleteHabit)

router.post(
  '/:id/complete',
  validateParams(uuidSchema),
  validateBody(completeHabitSchema),
  completeHabit,
)

export default router
