export type { TestCase, TestCaseDTO, ColumnKey, CreateTestCaseDTO, UpdateTestCaseDTO, TestCasePage, BulkTestCaseRequestDTO, ImportResultDto } from './testCase'
export type { TestSuiteDTO, CreateTestSuiteDTO } from './testSuite'
export type { TestRun, TestRunDTO, CreateTestRunDTO, UpdateTestRunDTO } from './testRun'
export type { ProjectDTO } from './project';



// ...інші типи для project, run, page, common, і т.д.
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

// і т.д.
