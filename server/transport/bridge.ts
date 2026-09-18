import type { AgentMessage } from "../../apps/desktop-agent/src/transport.js";
import { verifyTransportCredential, type TransportCredential } from "./auth.js";

export interface BridgeConnection { machineId:string; connectedAt:string; }
export class AgentBridge {
  private connections=new Map<string,BridgeConnection>();

  connect(credential:TransportCredential,token:string):boolean {
    if(!verifyTransportCredential(credential,token)) return false;
    this.connections.set(credential.machineId,{machineId:credential.machineId,connectedAt:new Date().toISOString()});
    return true;
  }

  disconnect(machineId:string):void { this.connections.delete(machineId); }
  isConnected(machineId:string):boolean { return this.connections.has(machineId); }

  accept(machineId:string,message:AgentMessage):boolean {
    return this.isConnected(machineId) && message.machineId===machineId;
  }
}
