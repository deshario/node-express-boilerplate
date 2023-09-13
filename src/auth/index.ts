import express from 'express'
import passport from 'passport'
import User from '../api/user/model'
import token from './jwt'
import local from './local'
import google from './google'
import { setupJWTStrategy } from './jwt/passport'
import { setupLocalStrategy } from './local/passport'
import { setupGoogleStrategy } from './google/passport'

setupJWTStrategy()
setupLocalStrategy()
setupGoogleStrategy()

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => done(null, user))
})

const router = express.Router()

router.use('/local', local)
router.use('/google', google)
router.use('/token', token)

export default router
