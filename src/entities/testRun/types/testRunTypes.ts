// ================ TEST RUN ТИПИ ================
export interface TestRunDTO {
    id: string;
    projectId: string;
    code: string;
    name: string;
    description?: string;
    status: string;
    startedAt?: string;
    completedAt?: string;
    assignedTo?: string;
    assignedToName?: string;
    testCaseIds?: string[];
    environmentId?: string;
    configurationId?: string;
    versionId?: string;
    milestoneId?: string;
    defaultAssigneeId?: string;
    environmentName?: string;
    configurationName?: string;
    versionName?: string;
    testCaseTitles?: string[];
    type?: string;      // Додаєш
    tags?: string;
}
export type CreateTestRunDTO = Omit<TestRunDTO, 'id' | 'startedAt' | 'completedAt'>;
export type UpdateTestRunDTO = Partial<Omit<TestRunDTO, 'id'>>;


