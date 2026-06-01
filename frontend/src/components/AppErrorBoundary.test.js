import React from "react";
import { render, screen } from "@testing-library/react";
import AppErrorBoundary from "./AppErrorBoundary";

function ThrowError() {
    throw new Error("Boom");
}

describe("AppErrorBoundary", () => {
    let consoleErrorSpy;

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => { });
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });

    test("renders children when no error occurs", () => {
        render(
            <AppErrorBoundary>
                <div id="safe-content">Safe content</div>
            </AppErrorBoundary>
        );

        expect(screen.getByText("Safe content")).toBeTruthy();
    });

    test("shows fallback UI when child throws", () => {
        render(
            <AppErrorBoundary>
                <ThrowError />
            </AppErrorBoundary>
        );

        const alert = screen.getByRole("alert");
        expect(alert).toBeTruthy();
        expect(alert.textContent).toContain("Something went wrong");
        expect(alert.textContent).toContain("Please reload the page and try again.");
    });
});
