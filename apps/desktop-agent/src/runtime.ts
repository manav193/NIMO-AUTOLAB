import { MachineAgent, type AgentCommand, type CommandResult } from "./machine-agent.js";
import { createHeartbeat, type MachineHeartbeat } from "./heartbeat.js";
import { SafeActionExecutor } from "./executors.js";

export interface AgentRuntimeConfig { machineId:string; agentVersion:string; capabilities?:string[]; heartbeatIntervalMs?:number; }

export class DesktopAgentRuntime {
  readonly agent:MachineAgent;
  readonly executor:SafeActionExecutor;
  private lastHeartbeat?:MachineHeartbeat;
  private heartbeatTimer?:ReturnType<typeof setInterval>;

  constructor(private readonly config:AgentRuntimeConfig, executor=new SafeActionExecutor()) {
    this.agent=new MachineAgent(config.machineId,config.capabilities??[]);
    this.executor=executor;
  }

  startHeartbeat(onHeartbeat:(heartbeat:MachineHeartbeat)=>void):void {
    this.stopHeartbeat();
    const interval=Math.max(1000,this.config.heartbeatIntervalMs??30000);
    const emit=()=>{ this.lastHeartbeat=createHeartbeat(this.config.machineId,this.config.agentVersion,this.config.capabilities??[]); onHeartbeat(this.lastHeartbeat); };
    emit();
    this.heartbeatTimer=setInterval(emit,interval);
  }

  stopHeartbeat():void {
    if(this.heartbeatTimer) clearInterval(this.heartbeatTimer);
    this.heartbeatTimer=undefined;
  }

  handle(command:AgentCommand):CommandResult {
    const validation=this.agent.receive(command);
    if(validation.status!=="COMPLETED") return validation;
    return this.executor.execute(command);
  }

  getHeartbeat():MachineHeartbeat|undefined { return this.lastHeartbeat; }
}
