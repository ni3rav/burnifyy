import express from 'express'
import { callback, login, logout, status } from '../controllers/authController'

const router = express.Router()

router.get('/login', login)
router.get('/callback', callback)
router.get('/status', status)
router.post('/logout', logout)

export default router
