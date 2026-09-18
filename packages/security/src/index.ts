export interface SessionCredential{sessionId:string;machineId:string;issuedAt:string;expiresAt:string;role:"STUDENT"|"TEACHER"|"ADMIN";tokenHash:string}
export function isExpired(expiresAt:string,now=Date.now()):boolean{return new Date(expiresAt).getTime()<=now}
export function rejectSecret(value:string):boolean{return /(?:api[_-]?key|password|bearer\s+|pat_|token\s*=)/i.test(value)}