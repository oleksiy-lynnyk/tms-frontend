import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProjectsPaged, createProject, updateProject, deleteProject } from '../api/projectApi';
import { ProjectDTO } from '../types/projectTypes';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import PageHeader from '../../../components/common/PageHeader';
import ProjectModal from '../components/ProjectModal';
import DeleteModal from '../../../components/common/DeleteModal';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const ProjectsView: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<ProjectDTO>>({});
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[1]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await getProjectsPaged(searchValue, page, pageSize);
            setProjects(data.content || []);
            setTotalElements(data.totalElements || 0);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [page, pageSize, searchValue]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (form.id) {
                await updateProject(form.id, form as ProjectDTO);
            } else {
                await createProject(form as ProjectDTO);
            }
            await loadProjects();
            setModalOpen(false);
            setForm({});
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProject(id);
            await loadProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const columns: ColumnDefinition<ProjectDTO>[] = [
        { key: 'code', label: 'Code', sortable: true },
        { key: 'name', label: 'Name', sortable: true, render: (p) => (
                <button className="btn btn-link p-0" onClick={() => navigate(`/project/${p.id}`)}>
                    {p.name}
                </button>
            )},
        { key: 'description', label: 'Description' },
        { key: 'testCasesCount', label: 'Test Cases' }
    ];

    return (
        <div>
            <PageHeader
                title="Projects"
                onAdd={() => { setForm({}); setModalOpen(true); }}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
            />

            <GenericEntityTable
                columns={columns}
                items={projects}
                currentPage={page}
                pageSize={pageSize}
                totalElements={totalElements}
                totalPages={totalPages}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageChange={setPage}
                onPageSizeChange={(size) => { setPageSize(size); setPage(0); }}
                onSortChange={() => {}}
                onEdit={(item) => { setForm(item); setModalOpen(true); }}
                onDelete={(id) => setDeleteId(id)}
            />

            <ProjectModal
                show={modalOpen}
                form={form}
                setForm={setForm}
                onClose={() => setModalOpen(false)}
                onSave={handleSave}
                isSaving={isSaving}
            />

            <DeleteModal
                show={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (deleteId) {
                        await handleDelete(deleteId);
                        setDeleteId(null);
                    }
                }}
                itemName={projects.find(p => p.id === deleteId)?.name}
            />
        </div>
    );
};

export default ProjectsView;
