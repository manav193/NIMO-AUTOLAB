import type {AgentCommand,CommandResult} from "./machine-agent.js";
import {MachineAgent} from "./machine-agent.js";
export type AgentMessage={type:"COMMAND";command:AgentCommand}|{type:"HEARTBEAT";machineId:string;timestamp:string};
export class AgentTransport {
 constructor(private readonly agent:MachineAgent){}
 handle(message:AgentMessage):CommandResult|{accepted:true}{
   if(message.type==="HEARTBEAT") return {accepted:true};
   return this.agent.receive(message.command);
 }
}