import type {Session} from "../../packages/types/src/index.js";
import {validateBinding} from "../../packages/security/src/session.js";
export function authorizeMachineSession(session:Session,machineId:string,now=Date.now()):boolean {
 return session.status==="ACTIVE" && validateBinding({sessionId:session.id,studentId:session.studentId,labId:session.labId,machineId:session.machineId,assignmentId:session.assignmentId,workspaceId:session.workspaceId,expiresAt:session.expiresAt},machineId,now);
}