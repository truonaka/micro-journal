const listeners = new Set();

export function emitToast(toast) {
    listeners.forEach(listener => {
        listener({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            type: toast.type || "error",
            message: toast.message || "Unexpected error"
        });
    });
}

export function subscribeToToasts(listener) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}