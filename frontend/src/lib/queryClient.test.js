import { shouldRetryQuery } from './queryClient'

describe('shouldRetryQuery', () => {
  test('retries transient network errors up to the limit', () => {
    const networkError = new Error('Network Error')

    expect(shouldRetryQuery(0, networkError)).toBe(true)
    expect(shouldRetryQuery(1, networkError)).toBe(true)
    expect(shouldRetryQuery(2, networkError)).toBe(false)
  })

  test('does not retry non-network API errors', () => {
    const notFoundError = {
      response: {
        status: 404,
        data: {
          detail: 'Not found'
        }
      }
    }

    expect(shouldRetryQuery(0, notFoundError)).toBe(false)
  })
})
