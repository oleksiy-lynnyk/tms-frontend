// src/api/environmentApi.ts
import { api } from './axios';
import type { EnvironmentDTO } from '../types';

export const fetchEnvironments = async (projectId: string): Promise<EnvironmentDTO[]> => {
    const { data } = await api.get(`/environments/project/${projectId}`);
    return data;
};

export const createEnvironment = async (dto: Partial<EnvironmentDTO>): Promise<EnvironmentDTO> => {
    const { data } = await api.post('/environments', dto);
    return data;
};

export const deleteEnvironment = async (id: string): Promise<void> => {
    await api.delete(`/environments/${id}`);
};




