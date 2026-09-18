export const API_ROUTES = {
  sessions: "/sessions",
  session: (id: string) => `/sessions/${id}`,
  actionPlans: "/action-plans",
  commands: "/commands",
  machine: (id: string) => `/machines/${id}`,
  heartbeat: (id: string) => `/machines/${id}/heartbeat`,
  assignments: "/assignments",
  submissions: "/submissions"
} as const;
