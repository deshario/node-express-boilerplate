import Joi from 'joi'
import { isValidObjectId } from 'mongoose'

export const newPostSchema = Joi.object().keys({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  author: Joi.string().required(),
})

export const postIdSchema = Joi.object().keys({
  postId: Joi.string()
    .custom((value, helpers) => {
      return isValidObjectId(value) || helpers.error('any.invalid')
    })
    .messages({ 'any.invalid': 'Invalid postId detected' }),
})
