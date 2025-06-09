// src/routes.ts

export const routes = {
    root: '/',
    projects: '/projects',
    users: '/users',

    // Шаблони для <Route path=...>
    projectPath: '/project/:projectId/*',

    // Генератори шляхів
    project: (projectId: string) => `/project/${projectId}`,
    projectCases: (projectId: string) => `/project/${projectId}/cases`,
    projectTestRuns: (projectId: string) => `/project/${projectId}/test-runs`,
    projectEnvironments: (projectId: string) => `/project/${projectId}/environments`,
    projectConfigurations: (projectId: string) => `/project/${projectId}/configurations`,
    projectVersions: (projectId: string) => `/project/${projectId}/versions`,
};

