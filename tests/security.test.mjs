import test from "node:test";
import assert from "node:assert/strict";

const actions = new Set(["OPEN_APP","CLOSE_APP","OPEN_FILE","OPEN_WORKSPACE","SAVE_WORKSPACE","GET_MACHINE_STATUS","LOCK_SESSION","END_SESSION"]);
const dangerous = new Set(["DELETE_FILE","RESTART","SHUTDOWN","SYSTEM_CHANGE"]);

function validateCommand(c) {
  const e=[];
  if (!c.commandId || !c.sessionId || !c.machineId) e.push("identity");
  if (!actions.has(c.action)) e.push("unsupported");
  if (c.source !== "NIMO-CORE") e.push("source");
  return e;
}

test("accepts allowlisted command",()=>assert.deepEqual(validateCommand({commandId:"c",sessionId:"s",machineId:"m",action:"OPEN_APP",source:"NIMO-CORE"}),[]));
test("rejects unsupported action",()=>assert.ok(validateCommand({commandId:"c",sessionId:"s",machineId:"m",action:"DELETE_FILE",source:"NIMO-CORE"}).includes("unsupported")));
test("dangerous actions are outside allowlist",()=>assert.ok([...dangerous].every(a=>!actions.has(a))));
test("rejects missing identity",()=>assert.ok(validateCommand({action:"OPEN_APP",source:"NIMO-CORE"}).includes("identity")));
test("rejects non-core source",()=>assert.ok(validateCommand({commandId:"c",sessionId:"s",machineId:"m",action:"OPEN_APP",source:"PROMPT-AII"}).includes("source")));
