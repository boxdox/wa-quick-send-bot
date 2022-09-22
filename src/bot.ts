import { Bot } from 'grammy'

export const createBot = (token: string) => {
  const bot = new Bot(token)

  return bot
}
