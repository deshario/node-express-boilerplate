import passport from 'passport'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { TJwtPayload, TDoneCallback } from '../../interfaces'
import env from '../../config/environment'
import User from '../../api/user/model'

const verifyPayload = async (payload: TJwtPayload, done: TDoneCallback) => {
  try {
    const user = await User.findById(payload.id)
    if (!user) return done(undefined, false, { message: 'E-mail not found!' })
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}

export const setupJWTStrategy = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: env.secret.accessToken,
  }
  passport.use(new JwtStrategy(jwtOptions, verifyPayload))
}
