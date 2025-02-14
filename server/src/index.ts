import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { env } from './utils/env'
import authRoutes from './routes/auth'
import tokenRoutes from './routes/tokens'

const app: Express = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//* routes

//* auth routes
app.use('/auth', authRoutes)

//* token routes
app.use('/token', tokenRoutes)

//* server initialization
app.listen(env.PORT, () => {
  console.log(`Server is running at http://localhost:${env.PORT}`)
})
