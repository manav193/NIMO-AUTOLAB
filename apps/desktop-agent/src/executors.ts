import type { AgentCommand, CommandResult } from "./machine-agent.js";

export interface AppRegistration { id:string; executablePath:string; }
export interface WorkspacePolicy { allowedRoots:string[]; }

function withinRoot(target:string, roots:string[]):boolean {
  const normalized=target.replaceAll("\\","/").toLowerCase();
  return roots.some(root=>{
    const r=root.replaceAll("\\","/").replace(/\/$/,"").toLowerCase();
    return normalized===r || normalized.startsWith(r+"/");
  });
}

export class SafeActionExecutor {
  constructor(
    private readonly apps:AppRegistration[]=[],
    private readonly workspace:WorkspacePolicy={allowedRoots:[]}
  ) {}

  execute(command:AgentCommand):CommandResult {
    if(command.action==="GET_MACHINE_STATUS")
      return {commandId:command.commandId,machineId:command.machineId,status:"COMPLETED"};
    if(command.action==="OPEN_APP"){
      const app=String(command.parameters.app??"");
      if(!this.apps.some(x=>x.id===app))
        return {commandId:command.commandId,machineId:command.machineId,status:"REJECTED",errorCode:"APP_NOT_ALLOWLISTED"};
      return {commandId:command.commandId,machineId:command.machineId,status:"COMPLETED"};
    }
    if(["OPEN_FILE","OPEN_WORKSPACE","SAVE_WORKSPACE"].includes(command.action)){
      const path=String(command.parameters.path??command.parameters.workspacePath??"");
      if(!path || !withinRoot(path,this.workspace.allowedRoots))
        return {commandId:command.commandId,machineId:command.machineId,status:"REJECTED",errorCode:"PATH_OUTSIDE_ALLOWED_ROOT"};
      return {commandId:command.commandId,machineId:command.machineId,status:"COMPLETED"};
    }
    if(["LOCK_SESSION","END_SESSION","CLOSE_APP"].includes(command.action))
      return {commandId:command.commandId,machineId:command.machineId,status:"COMPLETED"};
    return {commandId:command.commandId,machineId:command.machineId,status:"REJECTED",errorCode:"UNSUPPORTED_ACTION"};
  }
}

export function createWindowsExecutor(apps:AppRegistration[],allowedRoots:string[]):SafeActionExecutor {
  return new SafeActionExecutor(apps,{allowedRoots});
}
