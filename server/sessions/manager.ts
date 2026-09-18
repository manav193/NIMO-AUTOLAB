import type { Session,SessionStatus } from "../../packages/types/src/index.js";
export class SessionManager {
 private readonly sessions=new Map<string,Session>();
 create(session:Session){this.sessions.set(session.id,session);return session;}
 get(id:string){return this.sessions.get(id);}
 transition(id:string,status:SessionStatus){const s=this.sessions.get(id);if(!s)throw new Error("SESSION_NOT_FOUND");s.status=status;s.updatedAt=new Date().toISOString();return s;}
}