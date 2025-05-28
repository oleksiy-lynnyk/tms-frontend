// src/components/common/DeleteConfirmModal.tsx
import React, { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'

export interface DeleteConfirmModalProps {
    show: boolean
    onClose: () => void
    onConfirm: () => Promise<void> | void
    /** Назва елемента, який видаляється (відображається в запиті підтвердження) */
    itemName?: string
    /** Заголовок модалки (за замовчуванням “Confirm Delete”) */
    title?: string
    /** Текст у тілі модалки (за замовчуванням “Are you sure…?”) */
    body?: string
}

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
                                                             show,
                                                             onClose,
                                                             onConfirm,
                                                             itemName,
                                                             title = 'Confirm Delete',
                                                             body,
                                                         }) => {
    const defaultBody = `Are you sure you want to delete “${itemName ?? 'this item'}”? This action cannot be undone.`

    return (
        <Modal show={show} onHide={onClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body ?? defaultBody}
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
    )
}

export default DeleteConfirmModal
