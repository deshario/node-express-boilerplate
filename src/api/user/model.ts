import bcrypt from 'bcrypt'
import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  username: string
  email: string
  password: string
}

export interface IUserDocument extends IUser {
  verifyPassword: (password: string) => boolean
}

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true, versionKey: false },
)

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

UserSchema.methods.verifyPassword = function (password: string) {
  const isValid = bcrypt.compareSync(password, this.password)
  return isValid
}

UserSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  return user
}

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    this.password = hashPassword(this.password)
    return next()
  } catch (error) {
    return next(error as Error)
  }
})

const User = mongoose.model<IUserDocument>('Users', UserSchema)

export default User
