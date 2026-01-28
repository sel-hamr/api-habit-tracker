import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { authenticatedToken } from '../middleware/auth.ts'
import {
  getTag,
  addTag,
  deleteTag,
  updateTag,
} from '../controllers/tagController.ts'
import { insertTagSchema } from '../db/schema.ts'
import { tagIdSchema } from '../schemas/habitSchemas.ts'
import { asyncHandler } from '../middleware/asyncHandler.ts'

const router = Router()

router.use(authenticatedToken)

router.get('/', asyncHandler(getTag))

router.post('/', validateBody(insertTagSchema), asyncHandler(addTag))

router.delete('/:tagId', validateParams(tagIdSchema), asyncHandler(deleteTag))

router.put(
  '/:tagId',
  validateBody(insertTagSchema),
  validateParams(tagIdSchema),
  asyncHandler(updateTag),
)

export default router
