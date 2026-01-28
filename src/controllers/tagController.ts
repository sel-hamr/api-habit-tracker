import type { Response } from 'express'
import type { AuthenticatedRequest } from '../middleware/auth.ts'
import { db } from '../db/connection.ts'
import { sendResponse } from '../utils/responseFormatter.ts'
import { tags } from '../db/schema.ts'
import { eq } from 'drizzle-orm'

export const getTag = async (req: AuthenticatedRequest, res: Response) => {
  const tags = await db.query.tags.findMany()
  return sendResponse(res, true, tags, 200, 'Tags fetched successfully')
}

export const addTag = async (req: AuthenticatedRequest, res: Response) => {
  const { name, color } = req.body
  const [tag] = await db
    .insert(tags)
    .values({
      name,
      color,
    })
    .returning()
  return sendResponse(res, true, tag, 201, 'Tag created successfully')
}

export const deleteTag = async (req: AuthenticatedRequest, res: Response) => {
  const { tagId } = req.params
  await db.delete(tags).where(eq(tags.id, tagId))
  return sendResponse(res, true, null, 200, 'Tag deleted successfully')
}

export const updateTag = async (req: AuthenticatedRequest, res: Response) => {
  const body = req.body
  const { tagId } = req.params
  const [tag] = await db
    .update(tags)
    .set({ ...body, updateAt: new Date() })
    .where(eq(tags.id, tagId))
    .returning()
  return sendResponse(res, true, tag, 200, 'Tag updated successfully')
}
