import { api } from '../../../api/axios';
import type { TestSuiteDTO } from '../types/testSuiteTypes';

export async function fetchSuitesTree(projectId: string): Promise<TestSuiteDTO[]> {
    const response = await api.get<TestSuiteDTO[]>(`/test-suites/tree?projectId=${projectId}`);
    return response.data;
}

export async function createSuite(data: {
    projectId: string;
    name: string;
    description?: string;
    parentId?: string | null;
}): Promise<TestSuiteDTO> {
    const response = await api.post<TestSuiteDTO>('/test-suites', data);
    return response.data;
}

export async function updateSuite(id: string, data: {
    name: string;
    description?: string;
    parentId?: string | null;
}): Promise<TestSuiteDTO> {
    const response = await api.put<TestSuiteDTO>(`/test-suites/${id}`, data);
    return response.data;
}

export async function deleteSuite(id: string): Promise<void> {
    await api.delete(`/test-suites/${id}`);
}
