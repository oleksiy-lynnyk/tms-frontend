import { api } from './axios'
import type { TestRunDTO, ExecutionCommandDTO, Page } from '../types'

export const getRunsByProject = (
    projectId: string,
    params: Record<string, unknown> = {}
) =>
    api.get<Page<TestRunDTO>>(
        `/testruns/project/${projectId}`,
        { params }
    )

export const getRun = (id: string) =>
    api.get<TestRunDTO>(`/testruns/${id}`)

// Тепер приймаємо Partial<TestRunDTO>
export const createRun = (dto: Partial<TestRunDTO>) =>
    api.post<TestRunDTO>('/testruns', dto)

export const updateRun = (id: string, dto: Partial<TestRunDTO>) =>
    api.put<TestRunDTO>(`/testruns/${id}`, dto)

export const deleteRun = (id: string) =>
    api.delete<void>(`/testruns/${id}`)

export const executeRun = (id: string, cmd: ExecutionCommandDTO) =>
    api.post<TestRunDTO>(`/testruns/${id}/execute`, cmd)

export const completeRun = (id: string) =>
    api.post<void>(`/testruns/${id}/complete`)

export const cloneRun = (id: string) =>
    api.post<TestRunDTO>(`/testruns/${id}/clone`)
