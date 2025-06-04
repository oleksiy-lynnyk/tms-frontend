// src/api/testCaseApi.ts
import { api } from './axios';
import type {TestCaseDTO, BulkTestCaseRequestDTO, ImportResultDto, PageResponse, CreateTestCaseDTO} from '../types';
import type {AxiosProgressEvent} from "axios";

export async function fetchCasesBySuite(
    suiteId: string,
    search: string,
    page: number,
    pageSize: number,
    sortField: string = 'code',
    sortDir: 'asc' | 'desc' = 'asc'
) {
    const params = new URLSearchParams({
        suiteId,
        search,
        page: String(page),
        size: String(pageSize),
        sort: `${sortField},${sortDir}`,
    });
    const res = await fetch(`/api/cases?${params.toString()}`);
    return await res.json();
}

export const fetchCase = async (id: string): Promise<TestCaseDTO> => {
    const { data } = await api.get<TestCaseDTO>(`/cases/${id}`);
    return data;
};

export const createCase = async (
    testCase: CreateTestCaseDTO
): Promise<TestCaseDTO> => {
    const { data } = await api.post<TestCaseDTO>('/cases', testCase);
    return data;
};

export const updateCase = async (
    id: string,
    testCase: Omit<TestCaseDTO, 'id'>
): Promise<TestCaseDTO> => {
    const { data } = await api.put<TestCaseDTO>(`/cases/${id}`, testCase);
    return data;
};

export const deleteCase = async (id: string): Promise<void> => {
    await api.delete(`/cases/${id}`);
};

export const bulkUpdateCases = async (
    req: BulkTestCaseRequestDTO
): Promise<void> => {
    await api.post('/cases/bulk', req);
};

export const importTestCases = async (
    suiteId: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<ImportResultDto> => {
    const { data } = await api.post<ImportResultDto>(
        `/cases/import?suiteId=${suiteId}`,
        formData,
        {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress,
        }
    );
    return data;
};