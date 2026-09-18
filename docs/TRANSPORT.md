# Agent Transport

The Phase 3 transport bridge adds machine-bound credential verification on top of the structured message protocol.

## Credential flow

1. Enrollment issues a short-lived credential.
2. The credential is stored as a hash on the server side.
3. The agent presents the secret over a production TLS channel.
4. The bridge verifies the hash and expiration.
5. Messages are accepted only when the authenticated machine ID matches the envelope machine ID.

The current bridge is transport-agnostic. A WebSocket/TLS adapter can be added without changing command validation or execution policy.
