# Agent Transport

Agent/backend messages use a versioned structured envelope with message ID, type, machine ID, timestamp and payload.

Supported message types: ENROLLMENT_REQUEST, HEARTBEAT, COMMAND_REQUEST, COMMAND_RESULT.

The transport never carries an arbitrary shell command. Command payloads must conform to the allowlisted protocol from Phase 0/1.