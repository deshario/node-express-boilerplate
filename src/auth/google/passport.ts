import passport from 'passport'
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import env from '../../config/environment'
import User from '../../api/user/model'

const verify = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback,
) => {
  const email = profile.emails?.[0].value
  const existingUser = await User.findOne({ $or: [{ googleId: profile.id }, { email }] })
  if (existingUser) return done(null, existingUser)
  const user = await User.create({
    provider: 'google',
    googleId: profile.id,
    username: profile.displayName,
    email: profile.emails?.[0].value,
  })
  return done(null, user)
}

export const setupGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.auth.google.clientID,
        clientSecret: env.auth.google.clientSecret,
        callbackURL: '/auth/google/callback',
      },
      verify,
    ),
  )
}
