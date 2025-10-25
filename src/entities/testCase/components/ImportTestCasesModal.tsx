// src/components/testCase/ImportTestCasesModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar, Alert } from 'react-bootstrap';
import { importTestCases } from '../api/testCaseApi';
import type { ImportResultDto } from '@/entities/testCase/types/testCaseTypes';

interface Props {
    show: boolean;
    suiteId: string;
    onClose: () => void;
    onImported: () => void;
}

export default function ImportTestCasesModal({
                                                 show,
                                                 suiteId,
                                                 onClose,
                                                 onImported,
                                             }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [result, setResult] = useState<ImportResultDto | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFile(e.target.files?.[0] ?? null);
    };

    const handleImport = async () => {
        if (!file) return;
        setError(null);
        setUploadProgress(0);
        setResult(null);

        const form = new FormData();
        form.append('file', file);

        try {
            const resp = await importTestCases(
                suiteId,
                form,
                (evt) => {
                    if (evt.total && evt.loaded) {
                        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
                    }
                }
            );
            setResult(resp); // <--- Ось тут зміна!
            onImported();
        } catch (e: any) {
            setError(e.message || 'Import failed');
        }
    };

    // Скидаємо стан при закритті/повторному відкритті модалки
    useEffect(() => {
        if (!show) {
            setFile(null);
            setUploadProgress(0);
            setResult(null);
            setError(null);
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import Test Cases</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>CSV File</Form.Label>
                    <Form.Control
                        type="file"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </Form.Group>

                {uploadProgress > 0 && (
                    <ProgressBar
                        now={uploadProgress}
                        label={`${uploadProgress}%`}
                        className="mb-3"
                    />
                )}

                {error && <Alert variant="danger">{error}</Alert>}

                {result && (
                    <Alert variant={result.errors.length ? 'warning' : 'success'}>
                        Imported {result.created} cases
                        {result.errors.length
                            ? `, ${result.errors.length} errors`
                            : ''}
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={!file}
                    onClick={handleImport}
                >
                    Import
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
