// src/components/common/DeleteConfirmModal.tsx
import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface DeleteConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    /** Заголовок модалки */
    title?: string;
    /** Тіло модалки, замість стандартного */
    body?: string;
    /** Ім’я об’єкта для стандартного повідомлення (сюди будемо передавати code) */
    itemName?: string;
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
                                                             show,
                                                             onClose,
                                                             onConfirm,
                                                             title = 'Delete Test Case',
                                                             body,
                                                             itemName,
                                                         }) => (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {body ?? `Are you sure you want to delete "${itemName ?? 'this test case'}"?`}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={onClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
                Delete
            </Button>
        </Modal.Footer>
    </Modal>
);

export default DeleteConfirmModal;

