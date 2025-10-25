// src/api/userApi.ts
import { api } from '../../../api/axios'; // або свій http-клієнт
import type { AppUserFullDTO, AppUserShortDTO } from '@/entities/users/types/userTypes';

export const getUsersPaged = async (search = '', page = 0, size = 20) => {
    const params: any = { page, size };
    if (search) params.search = search;
    const { data } = await api.get('/app-users', { params });
    return data;
};

export const getUser = async (id: string) => {
    const { data } = await api.get(`/app-users/${id}`);
    return data;
};

export const createUser = async (dto: Omit<AppUserFullDTO, 'id'>) => {
    const { data } = await api.post('/app-users', dto);
    return data;
};

export const updateUser = async (id: string, dto: Omit<AppUserFullDTO, 'id'>) => {
    const { data } = await api.put(`/app-users/${id}`, dto);
    return data;
};

export const deleteUser = async (id: string) => {
    await api.delete(`/app-users/${id}`);
};

export const getUsersShort = async (): Promise<AppUserShortDTO[]> => {
    const { data } = await api.get('/app-users/short');
    return data;
};
