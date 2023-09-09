import mongoose, { Schema } from 'mongoose'
import { TPost } from '../types'

interface IPost extends TPost, Document {}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  author: { type: String, required: true },
})

const model = mongoose.model<IPost>('Posts', PostSchema)

export default model
