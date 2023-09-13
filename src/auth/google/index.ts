import express, { Request, Response } from 'express'
import passport from 'passport'
import { signAccessToken, signRefreshToken } from '../../services'

const router = express.Router()

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
  '/callback',
  passport.authenticate('google', { session: false }),
  (req: Request, res: Response) => {
    const payload = { id: req.user!._id, email: req.user!.email }
    const accessToken = signAccessToken(payload)
    const refreshToken = signRefreshToken(payload)
    return res.json({ success: true, accessToken, refreshToken })
  },
)

export default router
