// ================ TEST SUITE ТИПИ ================
export interface TestSuiteDTO {
    id: string;
    name: string;
    description?: string;
    projectId: string;
    parentId?: string | null;
    children?: TestSuiteDTO[];
    testCaseCount?: number;
    code?: string;
}
