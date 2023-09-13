import bcrypt from 'bcrypt'
import mongoose, { Schema, Document } from 'mongoose'
import { TUser } from '../../interfaces'

interface IUser extends TUser, Document {}

export interface IUserDocument extends IUser {
  verifyPassword: (password: string) => boolean
}

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: {
      type: String,
      select: false,
      required(this: IUser): boolean {
        return this.provider === 'local'
      },
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: { type: String },
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
