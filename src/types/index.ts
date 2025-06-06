// src/types/index.ts - Всі типи в одному файлі

// ================ ЗАГАЛЬНІ ТИПИ ================
export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export type PageResponse<T> = Page<T>;

export interface ExecutionCommandDTO {
    command: string;
}

// ================ PROJECT ТИПИ ================
export interface ProjectDTO {
    id: string;
    name: string;
    description?: string;
    code?: string;
    testCaseCount?: number;
}

export type Project = ProjectDTO;
export type CreateProjectDTO = Omit<ProjectDTO, 'id' | 'testCaseCount'>;
export type UpdateProjectDTO = Partial<CreateProjectDTO> & { id: string };

// ================ TEST SUITE ТИПИ ================
export interface TestSuiteDTO {
    id: string;
    name: string;
    description?: string;
    projectId: string;
    parentId?: string | null;
    children?: TestSuiteDTO[];
    testCaseCount?: number;
}

export type TestSuite = TestSuiteDTO;
export type CreateTestSuiteDTO = Omit<TestSuiteDTO, 'id' | 'children' | 'testCaseCount'>;
export type UpdateTestSuiteDTO = Partial<CreateTestSuiteDTO> & { id: string };

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
    steps?: TestStepDTO[]; // ОНОВЛЕНО
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
export type TestCasePage = Page<TestCaseDTO>;

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

export type CreateTestCaseDTO = Omit<TestCaseDTO, 'id' | 'code'> & { code?: string };
export type UpdateTestCaseDTO = Partial<Omit<TestCaseDTO, 'id'>>;

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

// ================ TEST RUN ТИПИ ================
export interface TestRunDTO {
    id: string;
    projectId: string;
    code: string;
    name: string;
    description?: string;
    status: string;
    startedAt: string;
    completedAt?: string;
}

export type TestRun = TestRunDTO;
export type CreateTestRunDTO = Omit<TestRunDTO, 'id' | 'startedAt' | 'completedAt'>;
export type UpdateTestRunDTO = Partial<Omit<TestRunDTO, 'id'>>;

export type StatusType = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked' | 'Aborted';

// Короткий (для assign/select)
export interface UserShortDTO {
    id: string;
    name: string;
}

// Повний (для CRUD, таблиці, створення/редагування)
export interface UserFullDTO {
    id: string;
    name: string;
    email: string;
    role: string; // "ADMIN" | "QA" | "VIEWER"
}
