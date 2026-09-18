import { ACTIONS, ActionPlan, Command } from "../../protocol/src/actions.js";

export const DANGEROUS_ACTIONS = ["DELETE_FILE", "RESTART", "SHUTDOWN", "SYSTEM_CHANGE"] as const;

export function validateActionPlan(plan: ActionPlan): string[] {
  const errors: string[] = [];
  if (!plan.planId || !plan.sessionId || !plan.machineId) errors.push("missing plan/session/machine identity");
  if (plan.planner !== "PROMPT-AII") errors.push("planner must be Prompt-Aii");
  if (!Array.isArray(plan.steps) || plan.steps.length === 0) errors.push("plan must contain at least one step");
  for (const step of plan.steps ?? []) if (!(ACTIONS as readonly string[]).includes(step.action)) errors.push(`unsupported action: ${step.action}`);
  return errors;
}

export function validateCommand(command: Command): string[] {
  const errors: string[] = [];
  if (!command.commandId || !command.sessionId || !command.machineId) errors.push("missing command/session/machine identity");
  if (!(ACTIONS as readonly string[]).includes(command.action)) errors.push("unsupported action");
  if (typeof command.params !== "object" || command.params === null || Array.isArray(command.params)) errors.push("invalid parameters");
  if (command.source !== "NIMO-CORE") errors.push("commands must originate from NIMO-CORE");
  return errors;
}

export function containsArbitraryCommand(value: unknown): boolean {
  if (typeof value === "string") return /(^|\s)(powershell|pwsh|cmd(?:\.exe)?|bash|sh|shell)(\s|$)|&&|;|\|\|/.test(value);
  if (Array.isArray(value)) return value.some(containsArbitraryCommand);
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).some(containsArbitraryCommand);
  return false;
}
