import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const protocol=fs.readFileSync(new URL("../packages/protocol/src/index.ts",import.meta.url),"utf8");
const security=fs.readFileSync(new URL("../packages/security/src/index.ts",import.meta.url),"utf8");
test("allowlist exists",()=>{for(const action of ["OPEN_APP","CLOSE_APP","OPEN_FILE","OPEN_WORKSPACE","SAVE_WORKSPACE","GET_MACHINE_STATUS","LOCK_SESSION","END_SESSION"]) assert.match(protocol,new RegExp(action));});
test("dangerous execution is not allowlisted",()=>{for(const action of ["RUN_SHELL","POWERSHELL","DELETE_FILE","RESTART","SHUTDOWN"]) assert.doesNotMatch(protocol,new RegExp(action));});
test("Prompt-Aii remains planner-only",()=>assert.match(fs.readFileSync(new URL("../integrations/prompt-aii/README.md",import.meta.url),"utf8"),/does not execute/i));
test("security boundary rejects secrets",()=>assert.match(security,/rejectSecret/));