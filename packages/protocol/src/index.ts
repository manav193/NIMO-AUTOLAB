import type {ActionPlan,ActionStep,Command} from "../../types/src/index.js";
export const ALLOWED_ACTIONS=["OPEN_APP","CLOSE_APP","OPEN_FILE","OPEN_WORKSPACE","SAVE_WORKSPACE","GET_MACHINE_STATUS","LOCK_SESSION","END_SESSION"] as const;
export type AllowedAction=typeof ALLOWED_ACTIONS[number];
export function isAllowedAction(action:string):action is AllowedAction{return (ALLOWED_ACTIONS as readonly string[]).includes(action)}
export function validateActionStep(step:ActionStep):boolean{return typeof step.stepId==="string"&&isAllowedAction(step.action)&&!!step.parameters}
export function validateActionPlan(plan:ActionPlan):boolean{return plan.source==="PROMPT-AII"&&plan.steps.length>0&&plan.steps.every(validateActionStep)}
export function validateCommand(command:Command):boolean{return isAllowedAction(command.action)&&!!command.sessionId&&!!command.machineId&&!!command.authorizationId&&!Object.values(command.parameters).some(v=>typeof v==="string"&&/^(powershell|cmd|bash|sh|exec|system\s)/i.test(v))}