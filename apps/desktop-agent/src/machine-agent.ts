import { isAllowedAction } from "../../../packages/protocol/src/index.js";
export interface AgentCommand { commandId:string; sessionId:string; machineId:string; action:string; parameters:Record<string,string|number|boolean>; authorizationId:string; }
export interface CommandResult { commandId:string; machineId:string; status:"COMPLETED"|"FAILED"|"REJECTED"; errorCode?:string; }
export class MachineAgent {
  constructor(public readonly machineId:string, public readonly capabilities:string[] = []) {}
  validate(command:AgentCommand):boolean {
    return command.machineId===this.machineId &&
      !!command.sessionId && !!command.authorizationId &&
      isAllowedAction(command.action) &&
      !Object.values(command.parameters).some(v=>typeof v==="string" && /^(powershell|cmd|bash|sh|exec|system\s)/i.test(v));
  }
  receive(command:AgentCommand):CommandResult {
    if(!this.validate(command)) return {commandId:command.commandId,machineId:this.machineId,status:"REJECTED",errorCode:"COMMAND_VALIDATION_FAILED"};
    return {commandId:command.commandId,machineId:this.machineId,status:"COMPLETED"};
  }
}