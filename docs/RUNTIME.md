# Desktop Agent Runtime

Phase 3 adds the execution boundary for the Windows Desktop Agent without permitting arbitrary OS commands.

## Runtime layers

1. MachineAgent validates machine/session/authorization and the action allowlist.
2. SafeActionExecutor validates action-specific parameters.
3. DesktopAgentRuntime coordinates command handling and heartbeat scheduling.
4. ReconnectController provides bounded exponential reconnect backoff.
5. AgentBridge accepts only authenticated, machine-bound transport messages.

## Safe execution rules

- Applications are referenced by logical IDs registered in an explicit allowlist.
- File/workspace actions must remain inside configured allowed roots.
- No shell, PowerShell, bash, exec, or arbitrary process strings are accepted.
- The executor is intentionally an execution-policy layer; a future Windows adapter may perform the actual OS operation only after these checks.
- Production transport must use TLS and securely stored, short-lived credentials.

## Current status

The repository now has a testable runtime boundary that can be connected to a real Windows implementation without weakening the security model.
