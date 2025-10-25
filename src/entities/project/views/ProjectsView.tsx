import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, createProject, updateProject, deleteProject } from '../api/projectApi';
import { ProjectDTO } from '../types/projectTypes';
import GenericEntityTable from '../../../components/common/GenericEntityTable';
import PageHeader from '../../../components/common/PageHeader';
import ProjectModal from '../components/ProjectModal';
import DeleteModal from '../../../components/common/DeleteModal';
import type { ColumnDefinition } from '../../../types/ColumnDefinition';

const ProjectsView: React.FC = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [form, setForm] = useState<Partial<ProjectDTO>>({});
    const [searchValue, setSearchValue] = useState("");

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

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
        { key: 'code', label: 'Code' },
        { key: 'name', label: 'Name', render: (p) => (
                <button className="btn btn-link p-0" onClick={() => navigate(`/project/${p.id}`)}>
                    {p.name}
                </button>
            )},
        { key: 'description', label: 'Description' },
        { key: 'testCasesCount', label: 'Test Cases' }
    ];

    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchValue.toLowerCase())
    );

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
                items={filteredProjects}
                currentPage={0}
                pageSize={filteredProjects.length}
                totalElements={filteredProjects.length}
                totalPages={1}
                onPageChange={() => {}}
                onPageSizeChange={() => {}}
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
