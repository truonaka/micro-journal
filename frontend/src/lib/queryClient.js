import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { normalizeApiError } from "./appError";
import { emitToast } from "./toastBus";

function handleGlobalError(error) {
    const appError = normalizeApiError(error);

    if (!appError.showToast) {
        return;
    }

    emitToast({
        type: "error",
        message: appError.message
    });
}

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: handleGlobalError
    }),
    mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
            if (mutation.options.meta?.suppressGlobalToast) {
                return;
            }

            handleGlobalError(error);
        }
    }),
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        },
        mutations: {
            retry: false
        }
    }
});