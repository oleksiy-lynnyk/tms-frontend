import React from "react";
import { Modal, Button } from "react-bootstrap";
import type { TestRunDTO as TestRun } from '../../types'

interface Props {
    show: boolean;
    run?: TestRun;
    onClose: () => void;
}

const ViewTestRunModal: React.FC<Props> = ({ show, run, onClose }) => (
    <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Test Run Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {run ? (
                <>
                    <div><strong>ID:</strong> {run.id}</div>
                    <div><strong>Name:</strong> {run.name}</div>
                    <div><strong>Status:</strong> {run.status}</div>
                    <div><strong>Created At:</strong> {new Date(run.startedAt).toLocaleString()}</div>
                    {/* Додай інші поля, якщо потрібно */}
                </>
            ) : (
                <div>No data</div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
                Закрити
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ViewTestRunModal;
