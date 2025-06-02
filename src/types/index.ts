// src/types/index.ts

// ---- Загальні типи ----
export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
export type PageResponse<T> = Page<T>;

// ---- Test Case ----
export interface TestCaseDTO {
    id: string;
    code: string;
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
// Якщо ще потрібно сортування/колонки по id — додай 'id' до ColumnKey

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

// ---- Test Suite ----
export interface TestSuiteDTO {
    id: string;
    name: string;
    description?: string;
    parentId?: string | null;       // <- тепер може бути null!
    projectId: string;
    testCaseCount?: number;         // <- для підрахунку кейсів у папці
    children?: TestSuiteDTO[];
}
export type CreateTestSuiteDTO = Omit<TestSuiteDTO, 'id' | 'children'> & { children?: TestSuiteDTO[] };

// ---- Test Run ----
export interface TestRunDTO {
    id: string;
    name: string;
    status: string;            // <- додано
    startedAt: string;         // <- додано
    projectId: string;         // <- додано (забери, якщо не потрібно!)
    // ...додай інші поля, якщо треба
}
export type TestRun = TestRunDTO;
export type CreateTestRunDTO = Omit<TestRunDTO, 'id'>;
export type UpdateTestRunDTO = Partial<Omit<TestRunDTO, 'id'>>;

// ---- Project ----
export interface ProjectDTO {
    id: string;
    name: string;
    // ...інші поля
}

// ---- Інші типи ----
export interface ExecutionCommandDTO {
    command: string;
}
