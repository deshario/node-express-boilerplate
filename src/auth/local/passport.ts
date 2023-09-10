import passport from 'passport'
import User from '../../api/user/model'
import { TDoneCallback } from '../../interfaces'
import { Strategy as LocalStrategy } from 'passport-local'

const verifyUser = async (email: string, password: string, done: TDoneCallback) => {
  try {
    const user = await User.findOne({ email }).select('+password')
    if (!user) return done(undefined, false, { message: 'E-mail not found!' })

    const isValid = user.verifyPassword(password)
    if (!isValid) return done(undefined, false, { message: 'Invalid Password' })

    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}

export const setupLocalStrategy = () => {
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, verifyUser))
}
