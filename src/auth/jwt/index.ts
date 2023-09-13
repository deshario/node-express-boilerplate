import express, { Request, Response } from 'express'
import { signAccessToken } from '../../services'
import { refreshTokenSchema } from '../../api/user/schema'
import { validateSchema, validateRefreshToken } from '../../middlewares'

const router = express.Router()

router.post(
  '/refresh',
  [validateSchema(refreshTokenSchema), validateRefreshToken],
  (req: Request, res: Response) => {
    const payload = { id: req.user!._id, email: req.user!.email }
    const accessToken = signAccessToken(payload)
    res.json({ success: true, accessToken })
  },
)

export default router
