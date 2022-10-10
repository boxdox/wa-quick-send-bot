import { Bot } from 'grammy'

import { generateLink, parseText } from './parser'
import { replies, SOURCE_CODE_URI } from './constants'

export const createBot = (token: string) => {
  const bot = new Bot(token)

  /* handle start command */
  bot.command('start', ctx => ctx.reply(replies.START_TEXT))

  /* handle help command */
  bot.command('help', ctx => ctx.reply(replies.HELP_TEXT, { disable_web_page_preview: true }))

  /* handle code command */
  bot.command('code', ctx => ctx.reply(SOURCE_CODE_URI))

  /* handle text message */
  bot.on(':text', ctx => {
    const messageId = ctx.msg.message_id
    const message = ctx.msg.text

    if (!message) {
      return ctx.reply(replies.EMPTY_MESSAGE)
    }
    const parsedText = parseText(message)

    if (parsedText.phone.length === 0) {
      return ctx.reply(replies.NO_PHONE_NUMBER)
    }

    const link = generateLink(parsedText)

    return ctx.reply(link, { disable_web_page_preview: true, reply_to_message_id: messageId })
  })

  /* catch all other messages here */
  bot.on('message', ctx => ctx.reply(replies.INVALID_MESSAGE))

  return bot
}
