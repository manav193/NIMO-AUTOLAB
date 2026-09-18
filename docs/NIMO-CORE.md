# NIMO-CORE

NIMO-CORE is the authorization and orchestration boundary. It authenticates the actor, resolves student/lab/machine/session context, checks role permissions, validates the Prompt-Aii ActionPlan, creates only allowlisted commands, dispatches them to the Desktop Agent, validates results, and records audit events.

It must never blindly forward AI-generated instructions.