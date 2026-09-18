# NIMO-AUTOLAB Desktop Agent

The Desktop Agent is the trusted execution boundary on a lab PC. Phase 1 provides machine identity, heartbeat, session binding primitives and strict command validation.

It accepts structured allowlisted commands only. It does not execute arbitrary shell, PowerShell, cmd, bash, or AI-generated command strings.