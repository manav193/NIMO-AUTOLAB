import { randomUUID } from "node:crypto";
export interface EnrollmentRequest { machineId:string; labId:string; displayName:string; platform:"windows"|"macos"; agentVersion:string; enrollmentCode:string; }
export interface EnrollmentResult { enrollmentId:string; machineId:string; status:"ENROLLED"; issuedAt:string; expiresAt:string; }
export function createEnrollment(req:EnrollmentRequest, now=new Date()):EnrollmentResult {
 if(!req.machineId||!req.labId||!req.enrollmentCode) throw new Error("INVALID_ENROLLMENT_REQUEST");
 const issuedAt=now.toISOString(); const expiresAt=new Date(now.getTime()+15*60_000).toISOString();
 return {enrollmentId:randomUUID(),machineId:req.machineId,status:"ENROLLED",issuedAt,expiresAt};
}