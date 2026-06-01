const STATUS_MESSAGES = {
    400: "Please review your input and try again.",
    404: "The requested resource was not found.",
    409: "Conflict detected. Please refresh and try again.",
    422: "Please fix the highlighted fields.",
    500: "Something went wrong. Please try again later."
};

function mapStatusToType(status) {
    if (status === 400) {
        return "bad_request";
    }
    if (status === 404) {
        return "not_found";
    }
    if (status === 409) {
        return "conflict";
    }
    if (status === 422) {
        return "validation";
    }
    if (status >= 500) {
        return "server";
    }
    return "unknown";
}

function extractFieldName(detailItem) {
    if (!Array.isArray(detailItem?.loc) || detailItem.loc.length === 0) {
        return null;
    }

    const filteredPath = detailItem.loc.filter(part => part !== "body" && part !== "query");
    if (filteredPath.length === 0) {
        return null;
    }

    return String(filteredPath[filteredPath.length - 1]);
}

function extractFieldErrors(detail) {
    const fieldErrors = {};

    if (Array.isArray(detail)) {
        detail.forEach(item => {
            const fieldName = extractFieldName(item);
            if (!fieldName) {
                return;
            }

            fieldErrors[fieldName] = item?.msg || "Invalid value";
        });
    }

    if (detail && typeof detail === "object" && !Array.isArray(detail) && detail.errors && typeof detail.errors === "object") {
        Object.entries(detail.errors).forEach(([fieldName, message]) => {
            fieldErrors[fieldName] = Array.isArray(message) ? message[0] : String(message);
        });
    }

    return fieldErrors;
}

function extractDetailMessage(detail) {
    if (typeof detail === "string") {
        return detail;
    }

    if (Array.isArray(detail)) {
        const firstMessage = detail.find(item => typeof item?.msg === "string")?.msg;
        return firstMessage || null;
    }

    return null;
}

export function normalizeApiError(error) {
    if (error?.isAppError) {
        return error;
    }

    const status = error?.response?.status || 0;
    const detail = error?.response?.data?.detail;
    const fieldErrors = extractFieldErrors(detail);
    const fallbackMessage = status >= 500 ? STATUS_MESSAGES[500] : "Request failed. Please try again.";
    const message = extractDetailMessage(detail) || STATUS_MESSAGES[status] || fallbackMessage;
    const type = mapStatusToType(status);
    const hasFieldErrors = Object.keys(fieldErrors).length > 0;

    return {
        isAppError: true,
        status,
        type,
        message,
        fieldErrors,
        showToast: !hasFieldErrors && type !== "validation",
        rawError: error
    };
}

export function getFieldError(error, fieldName) {
    const appError = normalizeApiError(error);
    return appError.fieldErrors?.[fieldName] || "";
}

export function getFormError(error) {
    const appError = normalizeApiError(error);
    if (Object.keys(appError.fieldErrors || {}).length > 0) {
        return "";
    }
    return appError.message || "";
}