# Security

QR codes identify a lab/machine but never authorize access by themselves. Student authentication and an authorized session are required. Sessions use short-lived credentials and bind student, lab, assignment, workspace, and machine context.

AI-generated plans are untrusted input. Only schema-valid, allowlisted actions can become commands. No arbitrary shell, PowerShell, cmd, or direct system-command execution is part of Phase 0. Destructive operations are excluded from the initial protocol.
