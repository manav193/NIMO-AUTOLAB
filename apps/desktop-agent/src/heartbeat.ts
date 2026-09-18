export interface MachineHeartbeat { machineId:string; agentVersion:string; status:"ONLINE"|"BUSY"|"MAINTENANCE"; timestamp:string; capabilities:string[]; }
export function createHeartbeat(machineId:string,agentVersion:string,capabilities:string[]=[]):MachineHeartbeat {
 return {machineId,agentVersion,status:"ONLINE",timestamp:new Date().toISOString(),capabilities};
}