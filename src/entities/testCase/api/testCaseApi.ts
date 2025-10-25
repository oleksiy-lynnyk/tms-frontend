// src/entities/testCase/api/testCaseApi.ts

import { api } from '../../../api/axios';
import type {
    TestCaseDTO,
    CreateTestCaseDTO,
    UpdateTestCaseDTO,
    BulkTestCaseRequestDTO,
    ImportResultDto,
} from '../../../entities/testCase/types/testCaseTypes';
import type { AxiosProgressEvent } from 'axios';
export async function fetchCasesBySuite(
    suiteId: string,
    page = 0,
    size = 20,
    search?: string
): Promise<{ content: TestCaseDTO[]; totalElements: number; totalPages: number }> {
    const params: any = { page, size };
    if (search) params.search = search;

    // ✅ Виправлений URL - використовує /test-cases/suite/{suiteId}
    const { data } = await api.get(`/test-cases/suite/${suiteId}`, { params });
    return data;
}

/** Створюємо новий тест-кейс */
export async function createCase(
    payload: CreateTestCaseDTO
): Promise<TestCaseDTO> {
    const { data } = await api.post('/test-cases', payload);
    return data;
}

/** Оновлюємо існуючий кейс */
export async function updateCase(
    id: string,
    payload: UpdateTestCaseDTO
): Promise<TestCaseDTO> {
    const { data } = await api.put(`/test-cases/${id}`, payload);
    return data;
}

/** Видаляємо кейс */
export async function deleteCase(id: string): Promise<void> {
    await api.delete(`/test-cases/${id}`);
}

/** Імпорт кейсів з CSV з прогресом завантаження */
export async function importTestCases(
    suiteId: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
): Promise<ImportResultDto> {
    const { data } = await api.post('/test-cases/import', formData, {
        params: { suiteId },
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
    });
    return data;
}

/** Масові операції над кейсами */
export async function bulkUpdateCases(
    body: BulkTestCaseRequestDTO
): Promise<void> {
    await api.post('/test-cases/bulk', body);
}
