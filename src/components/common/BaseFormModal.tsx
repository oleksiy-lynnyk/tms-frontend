// src/components/common/BaseFormModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface BaseFormModalProps<T> {
    title: string;
    show: boolean;
    onClose: () => void;
    onSave: () => Promise<void>;
    form: T;
    children: React.ReactNode;
    isSaving?: boolean;
}

function BaseFormModal<T>({
                              title,
                              show,
                              onClose,
                              onSave,
                              form,
                              children,
                              isSaving,
                          }: BaseFormModalProps<T>) {
    return (
        <Modal show={show} onHide={onClose} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose} disabled={isSaving}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSave} disabled={isSaving}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BaseFormModal;
