import { Request, Response } from 'express'
import User from './model'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find()
    return res.json({ success: true, data: users })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

export default {
  getUsers,
}
