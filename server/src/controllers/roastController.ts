import { Request, Response } from 'express'
import { env } from '../utils/env'
import { GoogleGenerativeAI } from '@google/generative-ai'

const geminiApiKey = env.GEMINI_API_KEY
if (!geminiApiKey) {
  throw new Error('GEMINI_API_KEY is missing in environment variables')
}

const genAI = new GoogleGenerativeAI(geminiApiKey)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

const generationConfig = {
  temperature: 2,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200,
  responseMimeType: 'text/plain'
}

const SYSTEM_MESSAGE = `
Assume yourself to be the most unhinged roaster alive who roasts people for their musical taste. 

You are provided with the user's top tracks and top artists/bands, and your job is to unleash your wrath on the user 
and roast them to the ground. 
Make sure your output is just plain text without any formatting or new line characters no quotation marks just text and period at most.
Make sure that you get as personal as possible without caring of user's emotions.
`.trim()

export async function generateRoast(req: Request, res: Response) {
  try {
    const { topTracks, topArtists } = req.body

    if (!topTracks || !topArtists) {
      res.status(400).json({ error: 'Top tracks and top artists are required' })
    }

    const userInput = `
    User's Top Tracks: ${topTracks.join(', ')}
    User's Top Artists: ${topArtists.join(', ')}
    `.trim()

    const result = await model.generateContent(`${SYSTEM_MESSAGE}\n\n${userInput}`)

    res.json({ roast: result.response.text() })
  } catch (error) {
    console.error('Error in generateRoast:', error)
    res.status(500).json({ error: 'Failed to generate roast' })
  }
}
