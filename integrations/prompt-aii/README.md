# Prompt-Aii Runtime Contract

Prompt-Aii is the runtime planner. It converts natural-language intent into a structured ActionPlan. It does not execute OS actions and must not emit arbitrary shell commands as an execution interface.

Example: “open my GitHub repo” → OPEN_APP(chrome) → NAVIGATE is intentionally outside the initial AutoLab allowlist; the integration must reject unsupported actions rather than silently execute them.
