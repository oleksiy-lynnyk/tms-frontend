import React from 'react';
import { Modal } from 'react-bootstrap';

interface BaseModalProps {
    title: string;
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'lg' | 'xl';
    maxHeight?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
    title,
    show,
    onClose,
    children,
    footer,
    size,
    maxHeight,
}) => {
    return (
        <Modal show={show} onHide={onClose} size={size} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={maxHeight ? { maxHeight, overflowY: 'auto' } : undefined}>
                {children}
            </Modal.Body>
            {footer && <Modal.Footer>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default BaseModal;