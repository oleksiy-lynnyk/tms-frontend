import React from 'react';
import { Form } from 'react-bootstrap';
import BaseFormModal from '../../../components/common/BaseFormModal';
import type { ProjectDTO } from '../types/projectTypes';

type Props = {
    show: boolean;
    form: Partial<ProjectDTO>;
    setForm: (form: Partial<ProjectDTO>) => void;
    onClose: () => void;
    onSave: () => void;
    isSaving?: boolean;
};

const ProjectModal: React.FC<Props> = ({
                                           show, form, setForm, onClose, onSave, isSaving
                                       }) => (
    <BaseFormModal
        title={form.id ? 'Edit Project' : 'New Project'}
        show={show}
        onClose={onClose}
        onSave={async () => onSave()}
        form={form}
        isSaving={isSaving}
    >
        <Form>
            <Form.Group className="mb-3" controlId="projectName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    autoFocus
                    type="text"
                    placeholder="Project name"
                    value={form.name || ''}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    maxLength={64}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="projectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Project description"
                    value={form.description || ''}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    maxLength={256}
                />
            </Form.Group>
        </Form>
    </BaseFormModal>
);

export default ProjectModal;
