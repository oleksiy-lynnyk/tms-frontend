import React from 'react';
import { Button, Badge, Table } from 'react-bootstrap';
import BaseModal from '../../components/common/BaseModal';
import type { TestRunDTO } from '@/entities/testRun/types/testRunTypes';

interface Props {
    show: boolean;
    run?: TestRunDTO;
    onClose: () => void;
    onCommand: (cmd: 'start' | 'pause' | 'resume' | 'stop' | 'complete') => void;
    onClone: () => void;
}

const statusButton = (run: TestRunDTO, onCommand: Props['onCommand']) => {
    if (run.status === 'NOT_STARTED')
        return <Button variant="primary" onClick={() => onCommand('start')}>Старт</Button>;
    if (run.status === 'IN_PROGRESS')
        return (
            <>
                <Button variant="outline-secondary" onClick={() => onCommand('pause')}>Пауза</Button>{' '}
                <Button variant="outline-secondary" onClick={() => onCommand('stop')}>Стоп</Button>{' '}
                <Button variant="primary" onClick={() => onCommand('complete')}>Завершити</Button>
            </>
        );
    if (run.status === 'PAUSED')
        return <Button variant="primary" onClick={() => onCommand('resume')}>Відновити</Button>;
    return null;
};

const getStatusVariant = (status: string) => {
    if (status === 'COMPLETED') return 'success';
    if (status === 'FAILED') return 'danger';
    if (status === 'IN_PROGRESS') return 'primary';
    return 'secondary';
};

const ViewTestRunModal: React.FC<Props> = ({ show, run, onClose, onCommand, onClone }) => {
    const footer = run ? (
        <>
            {statusButton(run, onCommand)}
            <Button variant="outline-secondary" onClick={onClone}>Клонувати</Button>
            <Button variant="outline-secondary" onClick={onClose}>Закрити</Button>
        </>
    ) : (
        <Button variant="outline-secondary" onClick={onClose}>Закрити</Button>
    );

    return (
        <BaseModal
            title="Test Run Details"
            show={show}
            onClose={onClose}
            footer={footer}
            size="lg"
        >
            {run ? (
                <Table borderless size="sm">
                    <tbody>
                        <tr><th>Code</th><td>{run.code || '—'}</td></tr>
                        <tr><th>Name</th><td>{run.name}</td></tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <Badge bg={getStatusVariant(run.status)}>{run.status}</Badge>
                            </td>
                        </tr>
                        <tr><th>Assigned To</th><td>{run.assignedToName || run.assignedTo || '—'}</td></tr>
                        <tr><th>Environments</th><td>{run.environmentName || '—'}</td></tr>
                        <tr><th>Configuration</th><td>{run.configurationName || '—'}</td></tr>
                        <tr><th>Version</th><td>{run.versionName || '—'}</td></tr>
                        <tr><th>Started At</th><td>{run.startedAt ? new Date(run.startedAt).toLocaleString() : '—'}</td></tr>
                        <tr><th>Completed At</th><td>{run.completedAt ? new Date(run.completedAt).toLocaleString() : '—'}</td></tr>
                        <tr>
                            <th>Cases</th>
                            <td>
                                {run.testCaseTitles?.length ? (
                                    <ul style={{ marginBottom: 0, paddingLeft: '1.2em' }}>
                                        {run.testCaseTitles.map((t: string, i: number) => <li key={i}>{t}</li>)}
                                    </ul>
                                ) : '—'}
                            </td>
                        </tr>
                        <tr>
                            <th>Description</th>
                            <td>{run.description || '—'}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <div>No data</div>
            )}
        </BaseModal>
    );
};

export default ViewTestRunModal;
