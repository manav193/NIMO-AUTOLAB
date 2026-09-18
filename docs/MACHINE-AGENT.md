# Machine Registration & Desktop Agent

A lab PC has a stable machine identity and is bound to a Lab. The Desktop Agent authenticates to the backend using a secure enrollment mechanism; credentials are never hardcoded in source.

The agent sends periodic heartbeats containing machine ID, agent version, status and capabilities.

A command is accepted only when machine ID, session ID and authorization context are valid and the action belongs to the allowlist. The agent remains a final enforcement boundary even after NIMO-CORE approval.

Phase 1 intentionally does not implement remote shell execution, destructive system commands, or unrestricted file operations.