import test from "node:test"; import assert from "node:assert/strict"; import {MachineAgent} from "../apps/desktop-agent/src/machine-agent.js"; import {createHeartbeat} from "../apps/desktop-agent/src/heartbeat.js";
const agent=new MachineAgent("LAB-A-PC-01");
const base={commandId:"c1",sessionId:"s1",machineId:"LAB-A-PC-01",action:"OPEN_APP",parameters:{app:"AutoCAD"},authorizationId:"auth1"};
test("agent accepts valid allowlisted command",()=>assert.equal(agent.receive(base).status,"COMPLETED"));
test("agent rejects wrong machine",()=>assert.equal(agent.receive({...base,machineId:"OTHER"}).status,"REJECTED"));
test("agent rejects missing authorization",()=>assert.equal(agent.receive({...base,authorizationId:""}).status,"REJECTED"));
test("agent rejects shell-like payload",()=>assert.equal(agent.receive({...base,parameters:{command:"powershell Remove-Item"}}).status,"REJECTED"));
test("heartbeat contains machine identity",()=>assert.equal(createHeartbeat("M1","0.1.0").machineId,"M1"));