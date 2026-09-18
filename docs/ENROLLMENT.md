# Machine Enrollment

Phase 2 establishes the enrollment boundary. A lab PC supplies machine identity, lab identity, display name, platform and agent version plus a short-lived enrollment code.

Enrollment codes are bootstrap credentials only: they expire quickly and must not be committed to source. The backend rejects duplicate machine IDs.

Production transport must use TLS and authenticated machine credentials. This phase defines the contract; it does not embed secrets or implement a real credential store.