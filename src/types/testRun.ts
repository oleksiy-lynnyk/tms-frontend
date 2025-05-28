/** DTO для Test Run */
export interface TestRunDTO {
        id: string;
        projectId: string;
        name: string;
        description?: string;   // додай якщо треба!
        status: string;
        startedAt: string;
        completedAt?: string;
    }

/** додаємо alias, щоб компоненти могли імпортувати `TestRun` */
export type TestRun = TestRunDTO;

/** Для створення Test Run */
export type CreateTestRunDTO = Omit<TestRunDTO, 'id' | 'startedAt' | 'completedAt'>;

/** Для оновлення Test Run (частково) */
export type UpdateTestRunDTO = Partial<Omit<TestRunDTO, 'id'>>;

