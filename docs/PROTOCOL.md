# Command Protocol
Lifecycle: REQUESTED → VALIDATING → APPROVED → EXECUTING → COMPLETED, with FAILED/CANCELLED terminal states.

Commands carry commandId, sessionId, machineId, action, parameters, source, authorizationId, status and timestamps. There is deliberately no arbitrary command-string field.