import { Bot } from 'grammy'

import { generateLink, parseText } from './parser'
import { HELP_TEXT, replies } from './constants'

export const createBot = (token: string) => {
  const bot = new Bot(token)

  /*
    handle help command
  */
  bot.command('help', ctx => {
    ctx.reply(HELP_TEXT)
  })

  /*
    handle message
  */
  bot.on('message', ctx => {
    const message = ctx.msg.text

    if (!message) {
      return ctx.reply(replies.EMPTY_MESSAGE)
    }
    const parsedText = parseText(message)

    if (parsedText.phone.length === 0) {
      return ctx.reply(replies.NO_PHONE_NUMBER)
    }

    const link = generateLink(parsedText)

    return ctx.reply(link)
  })

  return bot
}
