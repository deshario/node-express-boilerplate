import mongoose, { Schema, Document } from 'mongoose'
import { TPost } from '../../interfaces'

interface IPost extends TPost, Document {}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
)

const model = mongoose.model<IPost>('Posts', PostSchema)

export default model
