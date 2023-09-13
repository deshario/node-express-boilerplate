import express from 'express'
import userController from './controller'
import { checkAuthentication } from '../../middlewares'

const router = express.Router()

router.get('/', checkAuthentication, userController.getUsers)

export default router
