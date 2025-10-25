// src/entities/environment/api/environmentApi.ts

import { api } from '../../../api/axios';
import type { EnvironmentDTO } from '../types/environmentTypes';

/**
 * Fetch all environments for a given project
 * GET /environments/project/{projectId}
 */
export async function fetchEnvironments(projectId: string): Promise<EnvironmentDTO[]> {
    const { data } = await api.get<EnvironmentDTO[]>(`/environments/project/${projectId}`);
    return data;
}

/**
 * Create a new environment under a project
 * POST /environments
 */
export async function createEnvironment(env: Omit<EnvironmentDTO, 'id'>): Promise<EnvironmentDTO> {
    const { data } = await api.post<EnvironmentDTO>('/environments', env);
    return data;
}

/**
 * Update an existing environment by ID
 * PUT /environments/{id}
 */
export async function updateEnvironment(
    id: string,
    env: Omit<EnvironmentDTO, 'id'>
): Promise<EnvironmentDTO> {
    const { data } = await api.put<EnvironmentDTO>(`/environments/${id}`, env);
    return data;
}

/**
 * Delete an environment by ID
 * DELETE /environments/{id}
 */
export async function deleteEnvironment(id: string): Promise<void> {
    await api.delete(`/environments/${id}`);
}
