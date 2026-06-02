import { DEFAULT_API_PORT, resolveDefaultApiUrl } from "./apiClient";

describe("apiClient default URL resolution", () => {
    test("uses loopback host when running in browser localhost", () => {
        expect(resolveDefaultApiUrl("localhost")).toBe(`http://127.0.0.1:${DEFAULT_API_PORT}`);
    });

    test("uses current hostname when not localhost", () => {
        expect(resolveDefaultApiUrl("192.168.1.10")).toBe(`http://192.168.1.10:${DEFAULT_API_PORT}`);
    });
});
