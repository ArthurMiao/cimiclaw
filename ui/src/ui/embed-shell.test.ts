import { describe, expect, it } from "vitest";
import {
  parseEmbedShellNavigationMessage,
  resolveEmbedShellMode,
  setEmbedShellParam,
} from "./embed-shell.ts";

describe("embed shell", () => {
  it("detects explicit embed mode from query or hash", () => {
    expect(resolveEmbedShellMode("https://control.example/ui/chat?embed=1")).toBe(true);
    expect(resolveEmbedShellMode("https://control.example/ui/chat#embed=true")).toBe(true);
    expect(resolveEmbedShellMode("https://control.example/ui/chat")).toBe(false);
  });

  it("applies and removes the embed query param", () => {
    const url = new URL("https://control.example/ui/chat?session=main");

    setEmbedShellParam(url, true);
    expect(url.search).toBe("?session=main&embed=1");

    setEmbedShellParam(url, false);
    expect(url.search).toBe("?session=main");
  });

  it("parses supported parent-window navigation messages", () => {
    expect(
      parseEmbedShellNavigationMessage({
        type: "openclaw:navigate",
        payload: { tab: "usage" },
      }),
    ).toEqual({ tab: "usage", sessionKey: undefined });

    expect(
      parseEmbedShellNavigationMessage({
        type: "openclaw:navigate",
        payload: { sessionKey: "agent:main:work" },
      }),
    ).toEqual({ tab: undefined, sessionKey: "agent:main:work" });
  });

  it("ignores unsupported tabs and malformed messages", () => {
    expect(
      parseEmbedShellNavigationMessage({
        type: "openclaw:navigate",
        payload: { tab: "overview" },
      }),
    ).toBeNull();
    expect(parseEmbedShellNavigationMessage({ type: "unknown", payload: { tab: "chat" } })).toBeNull();
    expect(parseEmbedShellNavigationMessage(null)).toBeNull();
  });
});
