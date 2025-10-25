// src/entities/version/api/versionApi.ts

import { api } from '../../../api/axios';
import type { VersionDTO, CreateVersionDTO, UpdateVersionDTO } from '../types/versionTypes';

/**
 * Fetch all versions for a given project
 */
export async function fetchVersions(projectId: string): Promise<VersionDTO[]> {
    const { data } = await api.get<VersionDTO[]>(`/versions/project/${projectId}`);
    return data;
}

/**
 * Create a new version under a project
 */
export async function createVersion(payload: CreateVersionDTO): Promise<VersionDTO> {
    const { data } = await api.post<VersionDTO>('/versions', payload);
    return data;
}

/**
 * Update an existing version by ID
 */
export async function updateVersion(id: string, dto: UpdateVersionDTO): Promise<VersionDTO> {
    const { data } = await api.put<VersionDTO>(`/versions/${id}`, dto);
    return data;
}

/**
 * Delete a version by ID
 */
export async function deleteVersion(id: string): Promise<void> {
    await api.delete(`/versions/${id}`);
}