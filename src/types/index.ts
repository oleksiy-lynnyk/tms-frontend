// ================ ЗАГАЛЬНІ ТИПИ ================
export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
export type PageResponse<T> = Page<T>;





// src/types/index.ts

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

// src/types/index.ts


