# Architecture

## Components
- Prompt-Aii: natural language → structured runtime plan.
- NIMO-CORE: authentication, context, authorization, validation, orchestration.
- NIMO-AUTOLAB: lab/product contracts and infrastructure boundary.
- Desktop Agent: authenticated, allowlisted executor.
- NIMO-WEB: user-facing portal.
- HANDS-FREE_ALEXA: future voice interface.

## Flow
User → UI/Voice → Prompt-Aii → ActionPlan → NIMO-CORE → approved Command → Desktop Agent → PC → result → NIMO-CORE.
