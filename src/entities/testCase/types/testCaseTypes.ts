// ================ TEST CASE ТИПИ ================
export interface TestStepDTO {
    action: string;
    expectedResult: string;
    orderIndex: number;
    id?: string;
}
export interface TestCaseDTO {
    id: string;
    code: string;
    title: string;
    description?: string;
    preconditions?: string;
    steps?: TestStepDTO[];
    expectedResult?: string;
    priority?: string;
    tags?: string;
    state?: string;
    owner?: string;
    type?: string;
    automationStatus?: string;
    useCase?: string;
    component?: string;
    requirement?: string;
    suiteId: string;
    projectId: string;
}
export type TestCase = TestCaseDTO;
export type CreateTestCaseDTO = Omit<TestCaseDTO, 'id' | 'code'> & { code?: string };
export type UpdateTestCaseDTO = Partial<Omit<TestCaseDTO, 'id'>>;

export interface BulkTestCaseRequestDTO {
    ids: string[];
    delete?: boolean;
    moveToSuiteId?: string;
    copyToSuiteId?: string;
    operations?: Record<string, { type: 'SET' | 'CLEAR' | 'FIND_REMOVE'; value?: string }>;
}
export interface ImportResultDto {
    created: number;
    updated?: number;
    errors: string[];
}
