import type { Page } from './common'

export interface TestCaseDTO {
    id: string;
    code: string; // code є у збережених, обов’язковий
    title: string;
    description?: string;
    preconditions?: string;
    steps?: string;
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

export type ColumnKey =
    | 'select'
    | 'code'
    | 'title'
    | 'priority'
    | 'owner'
    | 'tags'
    | 'state'
    | 'type'
    | 'automationStatus'
    | 'component'
    | 'requirement'
    | 'projectId'
    | 'preconditions'
    | 'description'
    | 'steps'
    | 'expectedResult'
    | 'useCase'
    | 'suiteId';

// Головне виправлення:
export type CreateTestCaseDTO = Omit<TestCaseDTO, 'id' | 'code'> & { code?: string };
export type UpdateTestCaseDTO = Partial<Omit<TestCaseDTO, 'id'>>;
export type TestCasePage = Page<TestCaseDTO>;

export interface BulkTestCaseRequestDTO {
    ids: string[];
    delete?: boolean;
    moveToSuiteId?: string;
    copyToSuiteId?: string;
    operations?: Record<
        string,
        { type: 'SET' | 'CLEAR' | 'FIND_REMOVE'; value?: string }
    >;
}

export interface ImportResultDto {
    created: number;
    errors: Array<{
        rowNumber: number;
        message: string;
    }>;
}
