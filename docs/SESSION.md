# Secure Session Model

A session binds Student + Lab + Machine + optional Assignment + Workspace. Session states: PENDING, ACTIVE, LOCKED, ENDED, EXPIRED.

A QR code may identify a machine but cannot authorize a session. Authentication and backend authorization are required. Session credentials are short-lived and machine-bound.