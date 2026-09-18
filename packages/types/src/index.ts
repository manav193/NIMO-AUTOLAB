export type ID=string; export type ISODateTime=string;
export type Role="STUDENT"|"TEACHER"|"ADMIN"; export type SessionStatus="PENDING"|"ACTIVE"|"LOCKED"|"ENDED"|"EXPIRED"; export type MachineStatus="ONLINE"|"OFFLINE"|"BUSY"|"MAINTENANCE";
export type CommandStatus="REQUESTED"|"VALIDATING"|"APPROVED"|"EXECUTING"|"COMPLETED"|"FAILED"|"CANCELLED";
export type ActionType="OPEN_APP"|"CLOSE_APP"|"OPEN_FILE"|"OPEN_WORKSPACE"|"SAVE_WORKSPACE"|"GET_MACHINE_STATUS"|"LOCK_SESSION"|"END_SESSION"|"VERIFY";
export interface BaseEntity{id:ID;createdAt:ISODateTime;updatedAt?:ISODateTime}
export interface Machine extends BaseEntity{labId:ID;machineId:string;displayName:string;platform:"windows"|"macos";agentVersion:string;status:MachineStatus;lastSeen?:ISODateTime;capabilities:string[]}
export interface Assignment extends BaseEntity{labId:ID;title:string;subject:string;requiredSoftware:string[];resources:string[];submissionRequirements:string[];deadline?:ISODateTime}
export interface Workspace extends BaseEntity{studentId:ID;assignmentId?:ID;machineId?:ID;pathRef:string;status:"READY"|"ACTIVE"|"SAVED"|"CLEANED"}
export interface Session extends BaseEntity{studentId:ID;machineId:ID;labId:ID;assignmentId?:ID;workspaceId?:ID;status:SessionStatus;expiresAt:ISODateTime}
export interface ActionStep{stepId:string;action:ActionType;parameters:Record<string,string|number|boolean>;requiresConfirmation?:boolean}
export interface ActionPlan extends BaseEntity{planId:ID;sessionId:ID;intent:string;source:"PROMPT-AII";steps:ActionStep[]}
export interface Command extends BaseEntity{commandId:ID;sessionId:ID;machineId:ID;action:Exclude<ActionType,"VERIFY">;parameters:Record<string,string|number|boolean>;source:"NIMO-CORE";authorizationId:string;status:CommandStatus}