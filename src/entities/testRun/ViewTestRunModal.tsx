import React from "react";
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
        return <button className="bs-btn bs-btn-primary" onClick={() => onCommand('start')}>Старт</button>;
    if (run.status === 'IN_PROGRESS')
        return (
            <>
                <button className="bs-btn bs-btn-outline" onClick={() => onCommand('pause')}>Пауза</button>{' '}
                <button className="bs-btn bs-btn-outline" onClick={() => onCommand('stop')}>Стоп</button>{' '}
                <button className="bs-btn bs-btn-primary" onClick={() => onCommand('complete')}>Завершити</button>
            </>
        );
    if (run.status === 'PAUSED')
        return <button className="bs-btn bs-btn-primary" onClick={() => onCommand('resume')}>Відновити</button>;
    return null;
};

const ViewTestRunModal: React.FC<Props> = ({ show, run, onClose, onCommand, onClone }) => {
    if (!show) return null;
    return (
        <div className="bs-modal-overlay">
            <div className="bs-modal-content" style={{ minWidth: 480, maxWidth: 700 }}>
                <div className="bs-modal-header">
                    <div className="bs-modal-title">Test Run Details</div>
                    <button className="bs-close" type="button" onClick={onClose}>×</button>
                </div>
                <div className="bs-modal-body">
                    {run ? (
                        <table className="table table-borderless table-sm">
                            <tbody>
                            <tr><th>Code</th><td>{run.code || '—'}</td></tr>
                            <tr><th>Name</th><td>{run.name}</td></tr>
                            <tr><th>Status</th><td>
                                    <span className={`badge bg-${
                                        run.status === 'COMPLETED' ? 'success' :
                                            run.status === 'FAILED' ? 'danger' :
                                                run.status === 'IN_PROGRESS' ? 'primary' : 'secondary'
                                    }`}>{run.status}</span>
                            </td></tr>
                            <tr><th>Assigned To</th><td>{run.assignedToName || run.assignedTo || '—'}</td></tr>
                            <tr><th>Environments</th><td>{run.environmentName || '—'}</td></tr>
                            <tr><th>Configuration</th><td>{run.configurationName || '—'}</td></tr>
                            <tr><th>Version</th><td>{run.versionName || '—'}</td></tr>
                            <tr><th>Started At</th><td>{run.startedAt ? new Date(run.startedAt).toLocaleString() : '—'}</td></tr>
                            <tr><th>Completed At</th><td>{run.completedAt ? new Date(run.completedAt).toLocaleString() : '—'}</td></tr>
                            <tr>
                                <th>Cases</th>
                                <td>
                                    {run.testCaseTitles?.length
                                        ? (
                                            <ul style={{ marginBottom: 0, paddingLeft: '1.2em' }}>
                                                {run.testCaseTitles.map((t: string, i: number) => <li key={i}>{t}</li>)}
                                            </ul>
                                        )
                                        : '—'}
                                </td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{run.description || '—'}</td>
                            </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div>No data</div>
                    )}
                </div>
                <div className="bs-modal-footer">
                    {run && (
                        <>
                            {statusButton(run, onCommand)}
                            <button className="bs-btn bs-btn-outline" onClick={onClone}>Клонувати</button>
                        </>
                    )}
                    <button className="bs-btn bs-btn-outline" onClick={onClose}>
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewTestRunModal;
