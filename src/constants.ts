export const WHITESPACE_RE = /\s+/g
export const NUMBER_RE = /[0-9+]+/

export const WA_BASE_API = `https://api.whatsapp.com/send`

export const HELP_TEXT = `i am bot that convert phone number (with optional message) into a link that allows you to chat with someone on whatsapp without saving their contact
send me a message with phone number and optionally a message. note: we don't store anything you have entered. source for this bot is available on github
example message: "+9999 999 999 hi there", will return: https://api.whatsapp.com/send?phone=9999999999&text=hi+there
`
export const replies = {
  EMPTY_MESSAGE: `can't process empty messages :(`,
  NO_PHONE_NUMBER: `did you forget to pass a phone number?`,
} as const
