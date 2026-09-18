# Command Protocol

Initial actions: OPEN_APP, CLOSE_APP, OPEN_FILE, OPEN_WORKSPACE, SAVE_WORKSPACE, GET_MACHINE_STATUS, LOCK_SESSION, END_SESSION.

Lifecycle: REQUESTED → VALIDATING → APPROVED → EXECUTING → COMPLETED, with FAILED/CANCELLED terminal states.

A command carries commandId, sessionId, machineId, action, params, timestamp, source, authorization metadata, and status.
