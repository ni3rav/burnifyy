import express from 'express'
import { callback, login, status } from '../controllers/authController'

const router = express.Router()

router.get('/login', login)
router.get('/callback', callback)
router.get('/status', status)

export default router
