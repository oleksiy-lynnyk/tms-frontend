export interface EnvironmentDTO {
    id: string;
    projectId: string;
    name: string;
    slug?: string;          // Optional
    description?: string;   // Optional
    host?: string;          // Optional
    port?: number;          // Optional, відповідає Integer з бекенду
}

export type CreateEnvironmentDTO = Omit<EnvironmentDTO, 'id'>;