import React from 'react';
import SuiteSelectionModal from '../../../components/common/SuiteSelectionModal';

interface Props {
    show: boolean;
    onClose: () => void;
    onMove: (targetSuiteId: string) => Promise<void> | void;
    selectedCount: number;
    projectId: string;
}

const MoveTestCaseModal: React.FC<Props> = ({
    show,
    onClose,
    onMove,
    selectedCount,
    projectId,
}) => {
    return (
        <SuiteSelectionModal
            show={show}
            onClose={onClose}
            onConfirm={onMove}
            selectedCount={selectedCount}
            projectId={projectId}
            action="move"
        />
    );
};

export default MoveTestCaseModal;
