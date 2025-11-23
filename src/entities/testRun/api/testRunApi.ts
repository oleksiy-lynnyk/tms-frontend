import { api } from '../../../api/axios';
import type { TestRunDTO, CreateTestRunDTO, UpdateTestRunDTO } from '@/entities/testRun/types/testRunTypes';
import type { TestCaseDTO } from '@/entities/testCase/types/testCaseTypes'


// Отримати сторінку тест ранів по проекту
export const fetchTestRuns = async (projectId: string, search = '', page = 0, size = 20) => {
    const params: any = { page, size };
    if (search) params.search = search;
    const { data } = await api.get('/test-runs/project/' + projectId, { params });
    return data;
};

// Отримати один тест ран
export const fetchTestRun = async (id: string): Promise<TestRunDTO> => {
    const { data } = await api.get(`/test-runs/${id}`);
    return data;
};

// Створити тест ран (CreateTestRunDTO = TestRunDTO без id/start/completed)
export const createTestRun = async (dto: CreateTestRunDTO): Promise<TestRunDTO> => {
    const { data } = await api.post('/test-runs', dto);
    return data;
};

// Оновити тест ран
export const updateTestRun = async (id: string, dto: UpdateTestRunDTO): Promise<TestRunDTO> => {
    const { data } = await api.put(`/test-runs/${id}`, dto);
    return data;
};

// Видалити тест ран
export const deleteTestRun = async (id: string): Promise<void> => {
    await api.delete(`/test-runs/${id}`);
};
// Всі тест-кейси по проекту (для вибору в тест-рані)
export const fetchTestCasesForRun = async (projectId: string): Promise<TestCaseDTO[]> => {
    const { data } = await api.get('/test-cases', { params: { projectId } });
    return data;
};
