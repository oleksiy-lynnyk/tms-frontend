// src/api/userApi.ts
import { api } from './axios'; // або свій http-клієнт
import type { UserFullDTO } from '../types';

export const getUsersPaged = async (search = '', page = 0, size = 20) => {
    const params: any = { page, size };
    if (search) params.search = search;
    const { data } = await api.get('/users', { params });
    return data;
};

export const getUser = async (id: string) => {
    const { data } = await api.get(`/users/${id}`);
    return data;
};

export const createUser = async (dto: Omit<UserFullDTO, 'id'>) => {
    const { data } = await api.post('/users', dto);
    return data;
};

export const updateUser = async (id: string, dto: Omit<UserFullDTO, 'id'>) => {
    const { data } = await api.put(`/users/${id}`, dto);
    return data;
};

export const deleteUser = async (id: string) => {
    await api.delete(`/users/${id}`);
};
