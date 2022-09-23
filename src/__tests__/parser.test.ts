import { generateLink, parseText, ParseResult } from '../parser'
import { WA_BASE_API } from '../constants'

describe('text parser (only phone number)', () => {
  it('handle empty text', () => {
    const text = ''
    const result = parseText(text)

    expect(result.phone).toBe('')
  })

  it('parses text', () => {
    const text = '9999999999'
    const expected = '9999999999'

    const result = parseText(text)

    expect(result.phone).toBe(expected)
    expect(result.message).toBe('')
  })

  it('parses text with plus sign', () => {
    const text = '+9999999999'
    const expected = '9999999999'

    const result = parseText(text)

    expect(result.phone).toBe(expected)
    expect(result.message).toBe('')
  })

  it('parses text with spaces', () => {
    const text = '9999 999 999'
    const expected = '9999999999'

    const result = parseText(text)

    expect(result.phone).toBe(expected)
    expect(result.message).toBe('')
  })

  it('parses text with spaces and plus sign', () => {
    const text = '+9999 999 999'
    const expected = '9999999999'

    const result = parseText(text)

    expect(result.phone).toBe(expected)
    expect(result.message).toBe('')
  })
})

describe('text parser (with message)', () => {
  it('parse number and single word message', () => {
    const text = '9999999999 success'
    const expectedPhone = '9999999999'
    const expectedMessage = 'success'

    const result = parseText(text)

    expect(result.phone).toBe(expectedPhone)
    expect(result.message).toBe(expectedMessage)
  })

  it('parse number and multi word message', () => {
    const text = '9999999999 this should pass'
    const expectedPhone = '9999999999'
    const expectedMessage = 'this should pass'

    const result = parseText(text)

    expect(result.phone).toBe(expectedPhone)
    expect(result.message).toBe(expectedMessage)
  })

  it('parse number with spaces and multi word message', () => {
    const text = '9999 999 999 this should pass'
    const expectedPhone = '9999999999'
    const expectedMessage = 'this should pass'

    const result = parseText(text)

    expect(result.phone).toBe(expectedPhone)
    expect(result.message).toBe(expectedMessage)
  })

  it('parse number with spaces, plus sign and multi word message', () => {
    const text = '+9999 999 999 this should pass'
    const expectedPhone = '9999999999'
    const expectedMessage = 'this should pass'

    const result = parseText(text)

    expect(result.phone).toBe(expectedPhone)
    expect(result.message).toBe(expectedMessage)
  })
})

describe('link generation', () => {
  it('generates link with only phone number', () => {
    const parsed: ParseResult = { phone: '9999999999', message: '' }
    const expected = `${WA_BASE_API}?phone=9999999999`

    const link = generateLink(parsed)

    expect(link).toBe(expected)
  })

  it('generates link with phone number and single word message', () => {
    const parsed: ParseResult = { phone: '9999999999', message: 'hello' }
    const expected = `${WA_BASE_API}?phone=9999999999&text=hello`

    const link = generateLink(parsed)

    expect(link).toBe(expected)
  })

  it('generates link with phone number and multi word message', () => {
    const parsed: ParseResult = { phone: '9999999999', message: 'hello world' }
    const expected = `${WA_BASE_API}?phone=9999999999&text=hello+world`

    const link = generateLink(parsed)

    expect(link).toBe(expected)
  })
})
