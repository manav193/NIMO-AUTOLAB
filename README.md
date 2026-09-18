# NIMO-AUTOLAB

NIMO-AUTOLAB is a secure college laboratory automation platform combining AutoLab (lab/machine/session automation) and AutoDesk (assignment/workspace/submission workflows).

## Runtime architecture

User → NIMO-WEB / Voice → Prompt-Aii (planner) → ActionPlan → NIMO-CORE (context, auth, permission, validation, orchestration) → NIMO-AUTOLAB → Desktop Agent → PC.

Prompt-Aii plans actions; it never executes them. NIMO-CORE validates plans and permissions. Desktop Agent executes only a structured allowlisted command protocol.

## Phase 0

Foundation contracts, domain types, security boundaries, protocol definitions, tests, and documentation. No arbitrary shell/PowerShell execution.
