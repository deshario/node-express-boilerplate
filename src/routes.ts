import express from 'express'
import posts from './posts'

const router = express.Router()

router.use('/posts', posts)

router.get('/', (req, res) => {
  res.json({ timestamp: new Date().getTime() })
})

export default router
