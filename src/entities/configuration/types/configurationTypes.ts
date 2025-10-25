// src/entities/configuration/types/configurationTypes.ts
export interface ConfigurationDTO {
    id: string;
    projectId: string;
    name: string;
    slug: string;
    os?: string;
    browser?: string;
    device?: string;
    description?: string;
}

export type CreateConfigurationDTO = Omit<ConfigurationDTO, 'id'>;
export type UpdateConfigurationDTO = Partial<CreateConfigurationDTO>;

