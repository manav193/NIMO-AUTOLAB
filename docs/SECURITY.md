# Security
QR identifies a machine/lab but does not authorize a session. Student authentication is required. Sessions bind student + lab + machine + assignment + workspace and use short-lived credentials.

No arbitrary shell/PowerShell execution. Initial allowlist: OPEN_APP, CLOSE_APP, OPEN_FILE, OPEN_WORKSPACE, SAVE_WORKSPACE, GET_MACHINE_STATUS, LOCK_SESSION, END_SESSION.

AI-generated plans are untrusted until NIMO-CORE validates context, role, session, machine and action type.