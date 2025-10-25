// src/entities/version/types/versionTypes.ts

/** Версія (milestone/release) */
export interface VersionDTO {
    /** Унікальний ідентифікатор версії */
    id: string;
    /** Ідентифікатор проєкту, до якого належить версія */
    projectId: string;
    /** Заголовок версії */
    title: string;
    /** Короткий унікальний код (slug) */
    slug: string;
    /** Опис версії */
    description?: string;
}

/** DTO для створення нової версії */
export type CreateVersionDTO = Omit<VersionDTO, 'id'>;

/** DTO для оновлення існуючої версії */
export type UpdateVersionDTO = VersionDTO;

