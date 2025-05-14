import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface DeleteConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
    itemName?: string;
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
                                                             show,
                                                             onClose,
                                                             onConfirm,
                                                             itemName,
                                                         }) => (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Delete Test Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete “{itemName ?? 'this test case'}”?
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
