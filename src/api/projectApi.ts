// src/api/projectApi.ts
import { api } from './axios';
import type { PageResponse } from '../types';
import type { ProjectDTO} from '../types';

// ---- Залишаєш тільки одне оголошення ----
export const getProjectsPaged = async (
    search: string,
    page: number,
    size: number
): Promise<PageResponse<ProjectDTO>> => {
    const params = { search, page, size };
    const { data } = await api.get<PageResponse<ProjectDTO>>('/projects', { params });
    return data;
};

export const fetchProject = async (id: string): Promise<ProjectDTO> => {
    const { data } = await api.get<ProjectDTO>(`/projects/${id}`);
    return data;
};

export const createProject = async (project: Omit<ProjectDTO, 'id'>): Promise<ProjectDTO> => {
    const { data } = await api.post<ProjectDTO>('/projects', project);
    return data;
};

export const updateProject = async (id: string, project: Omit<ProjectDTO, 'id'>): Promise<ProjectDTO> => {
    const { data } = await api.put<ProjectDTO>(`/projects/${id}`, project);
    return data;
};

export const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};
