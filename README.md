# NIMO-AUTOLAB

Secure college laboratory automation platform combining **AutoLab** (lab/machine/session automation) and **AutoDesk** (assignment/workspace/submission workflows).

## Runtime architecture
User → NIMO-WEB / Voice → **Prompt-Aii (runtime planner)** → ActionPlan → **NIMO-CORE (auth/context/permission/validation/orchestration)** → NIMO-AUTOLAB → **Desktop Agent** → PC.

Prompt-Aii plans; it never executes. NIMO-CORE validates and authorizes. Desktop Agent executes only structured allowlisted commands.

## Phase 0
Foundation contracts, domain types, security boundaries, protocol definitions, tests and documentation. No arbitrary shell/PowerShell execution.

## Initial command allowlist
OPEN_APP, CLOSE_APP, OPEN_FILE, OPEN_WORKSPACE, SAVE_WORKSPACE, GET_MACHINE_STATUS, LOCK_SESSION, END_SESSION.

## AutoDesk
Assignment, workspace and submission lifecycle is defined as a module inside AutoLab.