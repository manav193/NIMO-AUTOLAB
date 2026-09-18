export interface SessionBinding {sessionId:string;studentId:string;labId:string;machineId:string;assignmentId?:string;workspaceId?:string;expiresAt:string;}
export function validateBinding(binding:SessionBinding, machineId:string, now=Date.now()):boolean {
 return binding.machineId===machineId && new Date(binding.expiresAt).getTime()>now;
}