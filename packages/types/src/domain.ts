export type ID = string;
export type ISODate = string;
export type Role = "STUDENT" | "TEACHER" | "ADMIN";
export type SessionStatus = "PENDING" | "ACTIVE" | "LOCKED" | "ENDED" | "EXPIRED";
export type MachineStatus = "ONLINE" | "OFFLINE" | "BUSY" | "MAINTENANCE";

export interface College { id: ID; name: string; }
export interface Department { id: ID; collegeId: ID; name: string; }
export interface Lab { id: ID; departmentId: ID; name: string; }
export interface Machine { id: ID; labId: ID; displayName: string; platform: "WINDOWS" | "MACOS" | "LINUX"; agentVersion: string; status: MachineStatus; lastSeen: ISODate | null; capabilities: string[]; }
export interface Student { id: ID; role: "STUDENT"; displayName: string; }
export interface Teacher { id: ID; role: "TEACHER"; displayName: string; }
export interface Admin { id: ID; role: "ADMIN"; displayName: string; }
export interface Assignment { id: ID; labId: ID; title: string; requiredSoftware: string[]; resourceIds: ID[]; submissionRequirements: string[]; deadline: ISODate | null; }
export interface Workspace { id: ID; studentId: ID; assignmentId: ID; machineId?: ID; state: "READY" | "ACTIVE" | "SAVED" | "SUBMITTED" | "RESET"; }
export interface Session { id: ID; studentId: ID; machineId: ID; labId: ID; assignmentId: ID; workspaceId: ID; createdAt: ISODate; expiresAt: ISODate; status: SessionStatus; }
export interface Submission { id: ID; sessionId: ID; workspaceId: ID; submittedAt: ISODate; status: "RECEIVED" | "VALIDATED" | "REJECTED"; }
