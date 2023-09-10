import { ObjectSchema } from 'joi'
import { IResponse } from '../interfaces'
import { Request, NextFunction } from 'express'

type TSchemaType = 'params' | 'body'

export const validateSchema = (schema: ObjectSchema, paramType: TSchemaType = 'body') => {
  return (req: Request, res: IResponse<void>, next: NextFunction) => {
    const validation = schema.validate(req[paramType])
    const errors = validation.error?.details || []
    const messages = errors.map((detail) => detail.message.replace(/"/g, ''))
    if (messages.length > 0) {
      return res.status(400).json({ success: false, error: messages[0] })
    }
    return next()
  }
}
