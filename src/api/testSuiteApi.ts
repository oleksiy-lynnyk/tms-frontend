// src/api/testSuiteApi.ts
import { api } from './axios';
import type { TestSuiteDTO } from '../types';
import type { ImportResultDto } from '../types';
import type { AxiosProgressEvent } from 'axios';


/** Дерево сьютів */
export const fetchSuitesTree = async (projectId: string) => {
    console.log('fetchSuitesTree CALLED with:', projectId);
    const { data } = await api.get<TestSuiteDTO[]>('/testsuites/tree', {
        params: { projectId }
    });
    return data;
};

export const fetchSuitesFlat = async (): Promise<TestSuiteDTO[]> => {
    const { data } = await api.get<TestSuiteDTO[]>('/testsuites/flat');
    return data;
};

export const fetchSuite = async (id: string): Promise<TestSuiteDTO> => {
    const { data } = await api.get<TestSuiteDTO>(`/testsuites/${id}`);
    return data;
};

export const createSuite = async (
    suite: Omit<TestSuiteDTO, 'id'>
): Promise<TestSuiteDTO> => {
    const { data } = await api.post<TestSuiteDTO>('/testsuites', suite);
    return data;
};

export const updateSuite = async (
    id: string,
    suite: Omit<TestSuiteDTO, 'id'>
): Promise<TestSuiteDTO> => {
    const { data } = await api.put<TestSuiteDTO>(`/testsuites/${id}`, suite);
    return data;
};

export const deleteSuite = async (id: string): Promise<void> => {
    await api.delete(`/testsuites/${id}`);
};



