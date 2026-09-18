import test from "node:test";
import assert from "node:assert/strict";
import {SafeActionExecutor} from "../apps/desktop-agent/src/executors.js";
import {DesktopAgentRuntime} from "../apps/desktop-agent/src/runtime.js";
import {ReconnectController} from "../apps/desktop-agent/src/reconnect.js";
import {hashTransportToken,verifyTransportCredential} from "../server/transport/auth.js";

const base={commandId:"c1",sessionId:"s1",machineId:"M1",authorizationId:"a1"};

test("executor accepts allowlisted app only",()=>{
  const e=new SafeActionExecutor([{id:"cad",executablePath:"C:/Apps/cad.exe"}]);
  assert.equal(e.execute({...base,action:"OPEN_APP",parameters:{app:"cad"}}).status,"COMPLETED");
  assert.equal(e.execute({...base,action:"OPEN_APP",parameters:{app:"powershell"}}).status,"REJECTED");
});
test("executor blocks paths outside allowed roots",()=>{
  const e=new SafeActionExecutor([],{allowedRoots:["C:/Lab/Workspace"]});
  assert.equal(e.execute({...base,action:"OPEN_FILE",parameters:{path:"C:/Lab/Workspace/a.dwg"}}).status,"COMPLETED");
  assert.equal(e.execute({...base,action:"OPEN_FILE",parameters:{path:"C:/Users/Public/a.dwg"}}).status,"REJECTED");
});
test("runtime keeps validation before execution",()=>{
  const r=new DesktopAgentRuntime({machineId:"M1",agentVersion:"0.2.0"});
  assert.equal(r.handle({...base,action:"OPEN_APP",parameters:{app:"unknown"}}).status,"COMPLETED");
  assert.equal(r.handle({...base,action:"OPEN_APP",parameters:{app:"powershell"}}).status,"REJECTED");
});
test("reconnect backoff is bounded",()=>{
  const r=new ReconnectController({initialDelayMs:1000,maxDelayMs:4000,maxAttempts:5});
  assert.deepEqual([r.nextDelayMs(),r.nextDelayMs(),r.nextDelayMs(),r.nextDelayMs(),r.nextDelayMs(),r.nextDelayMs()],[1000,2000,4000,4000,4000,undefined]);
});
test("transport credential uses a hashed short-lived token",()=>{
  const token="test-enrollment-token";
  const c={machineId:"M1",tokenHash:hashTransportToken(token),expiresAt:new Date(Date.now()+60000).toISOString()};
  assert.equal(verifyTransportCredential(c,token),true);
  assert.equal(verifyTransportCredential(c,"wrong"),false);
});
