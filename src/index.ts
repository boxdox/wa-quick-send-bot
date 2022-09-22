import 'dotenv/config'

import { createBot } from './bot'

// check if bot token exists
const token = process.env['BOT_TOKEN']
if (!token) {
  throw new Error('bot token not found. pass `BOT_TOKEN` as environment variable')
}

// create the bot
const bot = createBot(token)

console.log(bot)
