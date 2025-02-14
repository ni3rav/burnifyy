import dotenv from 'dotenv'
import { cleanEnv, str, port } from 'envalid'

dotenv.config()

export const env = cleanEnv(process.env, {
  CLIENT_ID: str(),
  CLIENT_SECRET: str(),
  REDIRECT_URI: str(),
  BASE_URL: str(),
  PORT: port()
})
