import { Router } from 'express'
import { authenticatedToken } from '../middleware/auth.ts'
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/userController.ts'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { getUserSchema, updateUserSchema } from '../schemas/userSchemas.ts'
import { asyncHandler } from '../middleware/asyncHandler.ts'

const router = Router()

router.use(authenticatedToken)

router.get('/', asyncHandler(getUsers))

router.get('/:id', validateParams(getUserSchema), asyncHandler(getUserById))

router.put(
  '/:id',
  validateParams(getUserSchema),
  validateBody(updateUserSchema),
  asyncHandler(updateUser),
)

router.delete('/:id', validateParams(getUserSchema), asyncHandler(deleteUser))

export default router
