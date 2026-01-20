import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { authenticatedToken } from '../middleware/auth.ts'
import {
  addTagsToHabit,
  completeHabit,
  createHabit,
  deleteHabit,
  getHabitById,
  getHabitsByTag,
  getUserHabits,
  updateHabits,
} from '../controllers/habitController.ts'

import {
  createHabitSchema,
  updateHabitSchema,
  uuidSchema,
  completeHabitSchema,
  tagIdSchema,
  addTagsToHabitSchema,
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
// Tag relationship routes
router.get('/tag/:tagId', validateParams(tagIdSchema), getHabitsByTag)

router.post(
  '/:id/tags',
  validateParams(uuidSchema),
  validateBody(addTagsToHabitSchema),
  addTagsToHabit,
)

export default router
