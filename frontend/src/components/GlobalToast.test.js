import React from "react";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import GlobalToast from "./GlobalToast";

const mockSubscribeToToasts = jest.fn();

jest.mock("../lib/toastBus", () => ({
    subscribeToToasts: (...args) => mockSubscribeToToasts(...args)
}));

describe("GlobalToast", () => {
    let emittedListener;
    let unsubscribe;

    beforeEach(() => {
        jest.useFakeTimers();
        emittedListener = null;
        unsubscribe = jest.fn();
        mockSubscribeToToasts.mockImplementation(listener => {
            emittedListener = listener;
            return unsubscribe;
        });
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test("subscribes on mount and unsubscribes on unmount", () => {
        const { unmount } = render(<GlobalToast />);

        expect(mockSubscribeToToasts).toHaveBeenCalledTimes(1);

        unmount();

        expect(unsubscribe).toHaveBeenCalledTimes(1);
    });

    test("renders toast when event is emitted", () => {
        const { unmount } = render(<GlobalToast />);

        act(() => {
            emittedListener({ id: "toast-1", type: "error", message: "Unexpected error" });
        });

        expect(screen.getByText("Unexpected error")).toBeTruthy();

        unmount();
    });

    test("removes toast after timeout", () => {
        const { unmount } = render(<GlobalToast />);

        act(() => {
            emittedListener({ id: "toast-2", type: "error", message: "Temporary" });
        });

        expect(screen.getByText("Temporary")).toBeTruthy();

        act(() => {
            jest.advanceTimersByTime(4000);
        });

        expect(screen.queryByText("Temporary")).toBeNull();

        unmount();
    });
});
