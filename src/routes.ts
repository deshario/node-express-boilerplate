import express from 'express'
import posts from './api/post'
import users from './api/user'
import auth from './auth'

const router = express.Router()

router.use('/auth', auth)
router.use('/api/posts', posts)
router.use('/api/users', users)

router.get('/', (req, res) => {
  res.json({ timestamp: new Date().getTime() })
})

export default router
