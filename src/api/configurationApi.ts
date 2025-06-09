// src/api/configurationApi.ts
import { api } from './axios';
import type { ConfigurationDTO } from '../types';

export const fetchConfigurations = async (projectId: string): Promise<ConfigurationDTO[]> => {
    const { data } = await api.get(`/configurations/project/${projectId}`);
    return data;
};

export const createConfiguration = async (dto: Partial<ConfigurationDTO>): Promise<ConfigurationDTO> => {
    const { data } = await api.post('/configurations', dto);
    return data;
};

export const deleteConfiguration = async (id: string): Promise<void> => {
    await api.delete(`/configurations/${id}`);
};

