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

const router = Router()

router.use(authenticatedToken)

router.get('/', getUsers)

router.get('/:id', validateParams(getUserSchema), getUserById)

router.put(
  '/:id',
  validateParams(getUserSchema),
  validateBody(updateUserSchema),
  updateUser,
)

router.delete('/:id', validateParams(getUserSchema), deleteUser)

export default router
