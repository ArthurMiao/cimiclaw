import { normalizeOpenClawProviderIndex } from "./normalize.js";
import { OPENCLAW_PROVIDER_INDEX } from "./cimiclaw-provider-index.js";
import type { OpenClawProviderIndex } from "./types.js";

export function loadOpenClawProviderIndex(
  source: unknown = OPENCLAW_PROVIDER_INDEX,
): OpenClawProviderIndex {
  return normalizeOpenClawProviderIndex(source) ?? { version: 1, providers: {} };
}
