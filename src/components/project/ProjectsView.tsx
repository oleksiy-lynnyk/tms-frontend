import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { getProjectsPaged, createProject, updateProject, deleteProject } from '../../api/projectApi';
import type { ProjectDTO } from '../../types/project';
import ProjectModal from './ProjectModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import Pagination from '../common/Pagination';
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const ProjectsView: React.FC = () => {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editProject, setEditProject] = useState<ProjectDTO | undefined>(undefined);
    const [deleteProjectCandidate, setDeleteProjectCandidate] = useState<ProjectDTO | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line
    }, [search, currentPage, pageSize]);

    const fetchProjects = async () => {
        try {
            const data = await getProjectsPaged(search, currentPage - 1, pageSize);
            setProjects(data.content || []);
            setTotalPages(data.totalPages || 1);
            setTotalElements(data.totalElements || 0);
        } catch {
            setProjects([]);
            setTotalElements(0);
        }
    };

    const handleModalSave = async (dto: Omit<ProjectDTO, 'id' | 'code'>, id?: string) => {
        if (id) {
            await updateProject(id, dto as Omit<ProjectDTO, 'id'>);
        } else {
            await createProject({ ...dto, code: '' });
        }
        setShowModal(false);
        setEditProject(undefined);
        await fetchProjects();
    };

    const handleDelete = async () => {
        if (deleteProjectCandidate) {
            await deleteProject(deleteProjectCandidate.id);
            setDeleteProjectCandidate(undefined);
            await fetchProjects();
        }
    };

    return (
        <div className="container-fluid py-4" style={{ minHeight: '100vh' }}>
            <div className="mx-auto" style={{ maxWidth: 2400 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="mb-0 app-font">Projects</h2>
                    <Button onClick={() => { setEditProject(undefined); setShowModal(true); }}>
                        + New Project
                    </Button>
                </div>
                <div className="table-responsive">
                    <Table bordered hover className="w-100">
                        <thead>
                        <tr>
                            <th style={{ width: 100 }}>Code</th>
                            <th>Project Title</th>
                            <th>Description</th>
                            <th style={{ width: 170 }}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center text-muted">No projects found</td>
                            </tr>
                        ) : (
                            projects.map(project => (
                                <tr key={project.id}>
                                    <td>{project.code}</td>
                                    <td>
                                        <button
                                            className="btn btn-link p-0 app-font"
                                            style={{ fontSize: 16, fontWeight: 500, textDecoration: 'underline', color: '#3d6cf3' }}
                                            onClick={() => navigate(`/project/${project.id}`)}
                                        >
                                            {project.name}
                                        </button>
                                    </td>
                                    <td>{project.description}</td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => { setEditProject(project); setShowModal(true); }}
                                        >Edit</Button>
                                        {' '}
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => setDeleteProjectCandidate(project)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </Table>
                </div>
                {/* Під таблицею: інформація про кількість + пагінація */}
                <div className="d-flex justify-content-between align-items-center my-2">
                    <div>
                        {`Показано ${projects.length} з ${totalElements} проектів`}
                    </div>
                    <div className="d-flex align-items-center">
                        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="form-select me-2" style={{ width: 120 }}>
                            {PAGE_SIZE_OPTIONS.map(sz => <option key={sz} value={sz}>{sz} per page</option>)}
                        </select>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
                {/* Пошук */}
                <div className="mb-2" style={{ maxWidth: 500 }}>
                    <input
                        className="form-control"
                        placeholder="Search projects by name or code"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>
            {/* Модалки */}
            <ProjectModal
                show={showModal}
                onClose={() => { setShowModal(false); setEditProject(undefined); }}
                project={editProject}
                onSave={handleModalSave}
            />
            <DeleteConfirmModal
                show={!!deleteProjectCandidate}
                onClose={() => setDeleteProjectCandidate(undefined)}
                onConfirm={handleDelete}
                itemName={deleteProjectCandidate?.name}
            />
        </div>
    );
};

export default ProjectsView;
