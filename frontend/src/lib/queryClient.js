import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { normalizeApiError } from './appError'
import { emitToast } from './toastBus'

const MAX_NETWORK_QUERY_RETRIES = 2

export function shouldRetryQuery(failureCount, error) {
  const appError = normalizeApiError(error)
  const isNetworkError = appError.status === 0
  return isNetworkError && failureCount < MAX_NETWORK_QUERY_RETRIES
}

function handleGlobalError(error) {
  const appError = normalizeApiError(error)

  if (!appError.showToast) {
    return
  }

  emitToast({
    type: 'error',
    message: appError.message
  })
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.meta?.suppressGlobalToast) {
        return
      }

      handleGlobalError(error)
    }
  }),
  defaultOptions: {
    queries: {
      retry: shouldRetryQuery,
      retryDelay: (attemptIndex) => Math.min(500 * (attemptIndex + 1), 1500),
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: false
    }
  }
})
