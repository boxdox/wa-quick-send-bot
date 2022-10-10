import {
  getBotInfo,
  generateCommandMessage,
  generateUserMessage,
  generatePhotoMessage,
} from './helper'

import { createBot } from '../bot'
import { replies, SOURCE_CODE_URI } from '../constants'

type Bot = ReturnType<typeof createBot>

let bot: Bot
let outgoingRequests: {}[] = []

beforeAll(async () => {
  bot = createBot('some-random-token')

  bot.api.config.use((_, method, payload, signal) => {
    outgoingRequests.push({ method, payload, signal })
    return { result: true, ok: true } as any
  })

  bot.botInfo = getBotInfo()
})

beforeEach(() => {
  outgoingRequests = []
})

describe('bot should respond to command messages', () => {
  test('should respond to start command', async () => {
    await bot.handleUpdate(generateCommandMessage('/start'))

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(replies.START_TEXT)
  })

  test('should respond to help command', async () => {
    await bot.handleUpdate(generateCommandMessage('/help'))

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(replies.HELP_TEXT)
  })

  test('should respond to code command', async () => {
    await bot.handleUpdate(generateCommandMessage('/code'))

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(SOURCE_CODE_URI)
  })
})

describe('should respond to messages', () => {
  test('should respond to empty text', async () => {
    await bot.handleUpdate(generateUserMessage(''))

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(replies.EMPTY_MESSAGE)
  })

  test('should respond to text with no phone number', async () => {
    await bot.handleUpdate(generateUserMessage('hello world!'))

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(replies.NO_PHONE_NUMBER)
  })

  test('should respond to message which are not text', async () => {
    await bot.handleUpdate(generatePhotoMessage())

    const response = outgoingRequests.pop() as any

    expect(response.payload.text).toBe(replies.INVALID_MESSAGE)
  })
})
