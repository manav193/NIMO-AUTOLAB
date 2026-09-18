export const ACTIONS = [
  "OPEN_APP", "CLOSE_APP", "OPEN_FILE", "OPEN_WORKSPACE",
  "SAVE_WORKSPACE", "GET_MACHINE_STATUS", "LOCK_SESSION", "END_SESSION"
] as const;
export type ActionType = typeof ACTIONS[number];

export interface ActionStep { stepId: string; action: ActionType; params: Record<string, string>; requiresConfirmation?: boolean; }
export interface ActionPlan { planId: string; intent: string; sessionId: string; machineId: string; createdAt: string; steps: ActionStep[]; planner: "PROMPT-AII"; }

export type CommandStatus = "REQUESTED" | "VALIDATING" | "APPROVED" | "EXECUTING" | "COMPLETED" | "FAILED" | "CANCELLED";
export interface Command { commandId: string; sessionId: string; machineId: string; action: ActionType; params: Record<string, string>; timestamp: string; source: "NIMO-CORE"; authorization: { role: string; policyVersion: string }; status: CommandStatus; }
