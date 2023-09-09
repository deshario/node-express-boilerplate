import mongoose, { Schema } from 'mongoose'
import { IPost } from '../interfaces'

const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  author: { type: String, required: true },
})

const model = mongoose.model('User', PostSchema)

export default model
