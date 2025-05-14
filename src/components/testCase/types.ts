// src/components/testCase/types.ts
export interface TestCase {
    id: number;
    /** обов’язково — потрібен, щоб бекенд не знімав кейс з с’юту */
    suiteId: number;
    title: string;
    priority?: string;
    owner?: string;
    tags?: string;
    state?: string;
    type?: string;
    automationStatus?: string;
    component?: string;
    requirement?: string;
    preconditions?: string;
    description?: string;
    steps?: string;
    expectedResult?: string;
    useCase?: string;
}

export type ColumnKey = keyof TestCase | 'select';

