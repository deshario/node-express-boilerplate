import express, { Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import User from '../api/user/model'
import env from '../config/environment'
import { setupLocalStrategy } from './local/passport'
import { setupJWTStrategy } from './jwt/passport'
import { checkAuthentication } from '../middlewares/validators'

// Initialize strategies
setupLocalStrategy()
setupJWTStrategy()

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => done(null, user))
})

const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
  const user = req.user!
  const payload = { id: user._id, email: user.email }
  const accessToken = jwt.sign(payload, env.secret.accessToken, { expiresIn: '5m' })
  const refreshToken = jwt.sign(payload, env.secret.refreshToken, { expiresIn: '7d' })
  return res.json({ accessToken, refreshToken })
})

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.json({ success: false, message: 'Please provide all fields' })
  }
  const existingUser = await User.findOne({ $or: [{ username }, { email }] })
  if (existingUser) {
    return res.json({ success: false, message: 'Please choose unique username and email' })
  }
  const user = await User.create(req.body)
  res.json({ success: true, user })
})

router.post('/validateToken', checkAuthentication, (req: Request, res: Response) => {
  return res.json({ success: true, user: req.user })
})

export default router
