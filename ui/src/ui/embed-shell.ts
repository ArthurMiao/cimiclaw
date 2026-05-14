import type { Tab } from "./navigation.ts";
import { normalizeOptionalString } from "./string-coerce.ts";

export const EMBED_SHELL_PARAM = "embed";

const EMBED_TRUE_VALUES = new Set(["1", "true", "yes", "on", "embed", "iframe"]);
const EMBED_ALLOWED_TABS = new Set<Tab>(["chat", "skills", "usage", "cron", "sessions"]);

function isTruthyEmbedValue(value: string | null): boolean {
  if (value == null) {
    return false;
  }
  const normalized = normalizeOptionalString(value)?.toLowerCase();
  return normalized ? EMBED_TRUE_VALUES.has(normalized) : false;
}

export function resolveEmbedShellMode(input: URL | string): boolean {
  const url = typeof input === "string" ? new URL(input, globalThis.location?.href) : input;
  const hashQuery = url.hash.startsWith("#") ? url.hash.slice(1) : url.hash;
  const hashParams = new URLSearchParams(hashQuery);
  return isTruthyEmbedValue(url.searchParams.get(EMBED_SHELL_PARAM)) ||
    isTruthyEmbedValue(hashParams.get(EMBED_SHELL_PARAM));
}

export function setEmbedShellParam(url: URL, enabled: boolean) {
  if (enabled) {
    url.searchParams.set(EMBED_SHELL_PARAM, "1");
    return;
  }
  url.searchParams.delete(EMBED_SHELL_PARAM);
}

export type EmbedShellNavigationTarget = {
  tab?: Tab;
  sessionKey?: string;
};

export function parseEmbedShellNavigationMessage(data: unknown): EmbedShellNavigationTarget | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const msg = data as { type?: unknown; payload?: unknown; tab?: unknown; sessionKey?: unknown };
  const type = typeof msg.type === "string" ? msg.type : "";
  if (type !== "openclaw:navigate") {
    return null;
  }

  const payload = msg.payload && typeof msg.payload === "object" ? msg.payload : msg;
  const tabRaw = typeof (payload as { tab?: unknown }).tab === "string"
    ? ((payload as { tab?: string }).tab ?? "")
    : "";
  const sessionKey = normalizeOptionalString(
    typeof (payload as { sessionKey?: unknown }).sessionKey === "string"
      ? ((payload as { sessionKey?: string }).sessionKey ?? null)
      : null,
  );
  const tab = EMBED_ALLOWED_TABS.has(tabRaw as Tab) ? (tabRaw as Tab) : undefined;

  if (!tab && !sessionKey) {
    return null;
  }

  return { tab, sessionKey: sessionKey ?? undefined };
}
