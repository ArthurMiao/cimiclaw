import type { OpenClawConfig } from "../config/types.cimiclaw.js";

export function isGatewayModelPricingEnabled(config: OpenClawConfig): boolean {
  return config.models?.pricing?.enabled !== false;
}
