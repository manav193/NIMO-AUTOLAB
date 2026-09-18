# NIMO-AUTOLAB

Secure college laboratory automation platform combining AutoLab and AutoDesk.

## Runtime
User → NIMO-WEB / Voice → Prompt-Aii (runtime planner) → ActionPlan → NIMO-CORE (auth/context/permission/validation/orchestration) → NIMO-AUTOLAB → Desktop Agent → PC.

## Current foundation
Phase 0: contracts/security. Phase 1: machine identity, sessions and agent enforcement. Phase 2: machine enrollment, versioned agent transport and connectivity primitives.

The Desktop Agent never executes arbitrary shell/PowerShell commands. Production transport must be authenticated and encrypted.