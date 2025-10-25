export interface ProjectDTO {
    id: string;
    code: string;
    name: string;
    description?: string;
    testCasesCount?: number;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
}


export interface PageDTO<T> {
    content: T[]
    totalElements: number
    totalPages: number
}