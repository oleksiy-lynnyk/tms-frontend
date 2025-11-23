import axios from "axios";
import { ProjectDTO } from "../types/projectTypes";

const API_URL = "/api/projects";

export const getAllProjects = async (): Promise<ProjectDTO[]> => {
    const response = await axios.get<ProjectDTO[]>(API_URL);
    return response.data;
};

export const getProjectsPaged = async (search = '', page = 0, size = 20) => {
    const params: any = { page, size };
    if (search) params.search = search;
    const response = await axios.get(API_URL, { params });
    return response.data;
};

export const getProjectById = async (id: string): Promise<ProjectDTO> => {
    const response = await axios.get<ProjectDTO>(`${API_URL}/${id}`);
    return response.data;
};

export const createProject = async (project: ProjectDTO): Promise<ProjectDTO> => {
    const response = await axios.post<ProjectDTO>(API_URL, project);
    return response.data;
};

export const updateProject = async (id: string, project: ProjectDTO): Promise<ProjectDTO> => {
    const response = await axios.put<ProjectDTO>(`${API_URL}/${id}`, project);
    return response.data;
};

export const deleteProject = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
