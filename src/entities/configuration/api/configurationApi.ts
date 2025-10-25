// src/entities/configuration/api/configurationApi.ts
import { api } from '../../../api/axios';
import type {
    ConfigurationDTO,
    CreateConfigurationDTO,
    UpdateConfigurationDTO,
} from '../types/configurationTypes';

/** GET /api/configurations/project/{projectId} */
export const fetchConfigurations = (projectId: string): Promise<ConfigurationDTO[]> =>
    api
        .get<ConfigurationDTO[]>(`/configurations/project/${projectId}`)
        .then(res => res.data);

/** решта без змін */
export const createConfiguration = (dto: CreateConfigurationDTO) =>
    api.post<ConfigurationDTO>('/configurations', dto).then(r => r.data);

export const updateConfiguration = (id: string, dto: UpdateConfigurationDTO) =>
    api.put<ConfigurationDTO>(`/configurations/${id}`, dto).then(r => r.data);

export const deleteConfiguration = (id: string) =>
    api.delete(`/configurations/${id}`).then(() => {});
