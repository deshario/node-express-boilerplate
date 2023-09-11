import express, { Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../api/user/model'
import env from '../config/environment'
import { setupJWTStrategy } from './jwt/passport'
import { setupLocalStrategy } from './local/passport'
import { loginSchema, registerSchema, refreshTokenSchema } from '../api/user/schema'
import {
  authenticate,
  validateSchema,
  verifyRefreshToken,
  checkAuthentication,
} from '../middlewares'

// Setup strategies
setupLocalStrategy()
setupJWTStrategy()

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => done(null, user))
})

const router = express.Router()

router.post(
  '/login',
  [validateSchema(loginSchema), authenticate],
  (req: Request, res: Response) => {
    const payload = { id: req.user!._id, email: req.user!.email }
    const accessToken = jwt.sign(payload, env.secret.accessToken, { expiresIn: '5m' })
    const refreshToken = jwt.sign(payload, env.secret.refreshToken, { expiresIn: '7d' })
    return res.json({ success: true, accessToken, refreshToken })
  },
)

router.post('/register', validateSchema(registerSchema), async (req: Request, res: Response) => {
  const { username, email } = req.body
  const existingUser = await User.findOne({ $or: [{ username }, { email }] })
  if (existingUser) {
    return res.json({ success: false, message: 'Please choose unique username and email' })
  }
  const user = await User.create(req.body)
  res.json({ success: true, user })
})

router.post('/profile', checkAuthentication, (req: Request, res: Response) => {
  return res.json({ success: true, user: req.user })
})

router.post(
  '/refreshToken',
  [validateSchema(refreshTokenSchema), verifyRefreshToken],
  (req: Request, res: Response) => {
    const payload = { id: req.user!._id, email: req.user!.email }
    const accessToken = jwt.sign(payload, env.secret.accessToken, { expiresIn: '5m' })
    res.json({ success: true, accessToken })
  },
)

export default router
