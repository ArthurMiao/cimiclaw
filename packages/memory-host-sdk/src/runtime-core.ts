// Focused runtime contract for memory plugin config/state/helpers.

export type { AnyAgentTool } from "./host/cimiclaw-runtime-agent.js";
export { resolveCronStyleNow } from "./host/cimiclaw-runtime-agent.js";
export { DEFAULT_PI_COMPACTION_RESERVE_TOKENS_FLOOR } from "./host/cimiclaw-runtime-agent.js";
export { resolveDefaultAgentId, resolveSessionAgentId } from "./host/cimiclaw-runtime-agent.js";
export { resolveMemorySearchConfig } from "./host/cimiclaw-runtime-agent.js";
export {
  asToolParamsRecord,
  jsonResult,
  readNumberParam,
  readStringParam,
} from "./host/cimiclaw-runtime-agent.js";
export { SILENT_REPLY_TOKEN } from "./host/cimiclaw-runtime-session.js";
export { parseNonNegativeByteSize } from "./host/cimiclaw-runtime-config.js";
export {
  getRuntimeConfig,
  /** @deprecated Use getRuntimeConfig(), or pass the already loaded config through the call path. */
  loadConfig,
} from "./host/cimiclaw-runtime-config.js";
export { resolveStateDir } from "./host/cimiclaw-runtime-config.js";
export { resolveSessionTranscriptsDirForAgent } from "./host/cimiclaw-runtime-config.js";
export { emptyPluginConfigSchema } from "./host/cimiclaw-runtime-memory.js";
export {
  buildActiveMemoryPromptSection,
  getMemoryCapabilityRegistration,
  listActiveMemoryPublicArtifacts,
} from "./host/cimiclaw-runtime-memory.js";
export { parseAgentSessionKey } from "./host/cimiclaw-runtime-agent.js";
export type { OpenClawConfig } from "./host/cimiclaw-runtime-config.js";
export type { MemoryCitationsMode } from "./host/cimiclaw-runtime-config.js";
export type {
  MemoryFlushPlan,
  MemoryFlushPlanResolver,
  MemoryPluginCapability,
  MemoryPluginPublicArtifact,
  MemoryPluginPublicArtifactsProvider,
  MemoryPluginRuntime,
  MemoryPromptSectionBuilder,
} from "./host/cimiclaw-runtime-memory.js";
export type { OpenClawPluginApi } from "./host/cimiclaw-runtime-memory.js";
