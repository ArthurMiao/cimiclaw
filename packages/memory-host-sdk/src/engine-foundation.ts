// Real workspace contract for memory engine foundation concerns.

export {
  resolveAgentContextLimits,
  resolveAgentDir,
  resolveAgentWorkspaceDir,
  resolveDefaultAgentId,
  resolveSessionAgentId,
} from "./host/cimiclaw-runtime-agent.js";
export {
  resolveMemorySearchConfig,
  resolveMemorySearchSyncConfig,
  type ResolvedMemorySearchConfig,
  type ResolvedMemorySearchSyncConfig,
} from "./host/cimiclaw-runtime-agent.js";
export { parseDurationMs } from "./host/cimiclaw-runtime-config.js";
export { loadConfig } from "./host/cimiclaw-runtime-config.js";
export { resolveStateDir } from "./host/cimiclaw-runtime-config.js";
export { resolveSessionTranscriptsDirForAgent } from "./host/cimiclaw-runtime-config.js";
export {
  hasConfiguredSecretInput,
  normalizeResolvedSecretInputString,
} from "./host/cimiclaw-runtime-config.js";
export { root } from "./host/cimiclaw-runtime-io.js";
export { isPathInside } from "./host/fs-utils.js";
export { createSubsystemLogger } from "./host/cimiclaw-runtime-io.js";
export { detectMime } from "./host/cimiclaw-runtime-io.js";
export { resolveGlobalSingleton } from "./host/cimiclaw-runtime-io.js";
export { onSessionTranscriptUpdate } from "./host/cimiclaw-runtime-session.js";
export { splitShellArgs } from "./host/cimiclaw-runtime-io.js";
export { runTasksWithConcurrency } from "./host/cimiclaw-runtime-io.js";
export {
  shortenHomeInString,
  shortenHomePath,
  resolveUserPath,
  truncateUtf16Safe,
} from "./host/cimiclaw-runtime-io.js";
export type { OpenClawConfig } from "./host/cimiclaw-runtime-config.js";
export type { SessionSendPolicyConfig } from "./host/cimiclaw-runtime-config.js";
export type { SecretInput } from "./host/cimiclaw-runtime-config.js";
export type {
  MemoryBackend,
  MemoryCitationsMode,
  MemoryQmdConfig,
  MemoryQmdIndexPath,
  MemoryQmdMcporterConfig,
  MemoryQmdSearchMode,
} from "./host/cimiclaw-runtime-config.js";
export type { MemorySearchConfig } from "./host/cimiclaw-runtime-config.js";
