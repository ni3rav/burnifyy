import express from 'express'
import { user, topTracks, topArtists } from '../controllers/userController'

const router = express.Router()

router.get('/', user)
router.get('/top-tracks', topTracks)
router.get('/top-artists', topArtists)

export default router
