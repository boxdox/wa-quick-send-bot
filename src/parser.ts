import { WHITESPACE_RE, NUMBER_RE, WA_BASE_API } from './constants'

export type ParseResult = { phone: string; message: string }

export const parseText = (text: string): ParseResult => {
  const textSplit = text.split(WHITESPACE_RE)
  const numberSplit: string[] = []
  const messageSplit: string[] = []

  textSplit.forEach(part => {
    if (NUMBER_RE.test(part)) {
      numberSplit.push(part)
    } else {
      messageSplit.push(part)
    }
  })

  const phone = numberSplit.join('').replace('+', '') ?? ''

  // TODO: maintain original spacing instead of forcing single space
  const message = messageSplit.join(' ')
  return { message, phone }
}

export const generateLink = (parsedText: ParseResult): string => {
  // example: https://api.whatsapp.com/send?phone=xxxx&text=xxxx
  const link = new URL('', WA_BASE_API)
  link.searchParams.append('phone', parsedText.phone)
  if (parsedText.message.length > 0) {
    link.searchParams.append('text', parsedText.message)
  }
  return link.toString()
}
