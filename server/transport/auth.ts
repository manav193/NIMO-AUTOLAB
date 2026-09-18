import { createHash, timingSafeEqual } from "node:crypto";

export interface TransportCredential { machineId:string; tokenHash:string; expiresAt:string; }

export function hashTransportToken(token:string):string {
  return createHash("sha256").update(token).digest("hex");
}

export function verifyTransportCredential(credential:TransportCredential,token:string,now=Date.now()):boolean {
  if(!token || new Date(credential.expiresAt).getTime()<=now) return false;
  const expected=Buffer.from(credential.tokenHash,"hex");
  const actual=Buffer.from(hashTransportToken(token),"hex");
  return expected.length===actual.length && timingSafeEqual(expected,actual);
}
