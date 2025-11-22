import React from 'react';
import SuiteSelectionModal from '../../../components/common/SuiteSelectionModal';

interface Props {
    show: boolean;
    onClose: () => void;
    onCopy: (targetSuiteId: string) => Promise<void> | void;
    selectedCount: number;
    projectId: string;
}

const CopyTestCaseModal: React.FC<Props> = ({
    show,
    onClose,
    onCopy,
    selectedCount,
    projectId,
}) => {
    return (
        <SuiteSelectionModal
            show={show}
            onClose={onClose}
            onConfirm={onCopy}
            selectedCount={selectedCount}
            projectId={projectId}
            action="copy"
        />
    );
};

export default CopyTestCaseModal;
