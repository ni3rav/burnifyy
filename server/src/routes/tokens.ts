import express from 'express'
import { refresh } from '../controllers/tokenController'

const router = express.Router()

router.get('/refresh', refresh)

export default router
