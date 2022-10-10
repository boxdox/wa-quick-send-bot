import { Update } from 'grammy/out/types'

const generateRandomId = (): number => {
  const min = 1000
  const max = 20000
  return Math.floor(Math.random() * (max - min) + min)
}

const generateRandomStringId = (length: number) =>
  Array.from(Array(length))
    .map(() => Math.random().toString(36)[2] || 0)
    .join('')

const generateGenericMessage = (messageUpdater: Partial<Update['message']> = {}): Update => ({
  update_id: generateRandomId(),
  message: {
    date: new Date().getTime(),
    chat: {
      id: 1,
      first_name: 'npm',
      last_name: 'test',
      username: 'npm_test',
      type: 'private',
    },
    message_id: generateRandomId(),
    ...messageUpdater,
  },
})

export const generateUserMessage = (message: string) => generateGenericMessage({ text: message })

export const generateCommandMessage = (command: string, args?: string) =>
  generateGenericMessage({
    text: command + args,
    entities: [
      {
        type: 'bot_command',
        offset: 0,
        length: command.length,
      },
    ],
  })

export const generatePhotoMessage = () =>
  generateGenericMessage({
    photo: [
      {
        file_id: generateRandomStringId(100),
        file_unique_id: generateRandomStringId(16),
        file_size: 1024,
        width: 100,
        height: 100,
      },
    ],
  })

export const getBotInfo = () =>
  ({
    id: 42,
    first_name: 'no_save_wa_bot',
    username: 'no_save_wa_bot',
    is_bot: true,
    can_join_groups: true,
    can_read_all_group_messages: true,
    supports_inline_queries: false,
  } as const)
