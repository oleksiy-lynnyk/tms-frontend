import type { TestCaseDTO } from './testCase';

/** DTO для Test Suite */
export interface TestSuiteDTO {
        id: string;
        name: string;
        description?: string;
        projectId: string;
        parentId?: string | null;
        children?: TestSuiteDTO[];
        testCases?: TestCaseDTO[];
}

/** Alias для компонент */
export type TestSuite = TestSuiteDTO;

/** Для створення нової с’ютки */
export type CreateTestSuiteDTO = Omit<TestSuiteDTO, 'id' | 'children' | 'testCases'>;

/** Для оновлення с’ютки */
export type UpdateTestSuiteDTO = Partial<CreateTestSuiteDTO> & { id: string };
