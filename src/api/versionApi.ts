import { api } from './axios';
import type { VersionDTO } from '../types';

export const fetchVersions = async (projectId: string): Promise<VersionDTO[]> => {
    const { data } = await api.get(`/versions/project/${projectId}`);
    return data;
};

export const createVersion = async (dto: Partial<VersionDTO>): Promise<VersionDTO> => {
    const { data } = await api.post('/versions', dto);
    return data;
};

export const deleteVersion = async (id: string): Promise<void> => {
    await api.delete(`/versions/${id}`);
};
