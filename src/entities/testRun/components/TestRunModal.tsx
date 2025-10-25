// src/entities/testRun/components/TestRunModal.tsx

import React from 'react';
import BaseFormModal from '../../../components/common/BaseFormModal';
import { TestRunDTO } from '../types/testRunTypes';

interface Props {
    show: boolean;
    testRun?: TestRunDTO;
    onClose: () => void;
    onSave: (data: Partial<TestRunDTO>) => Promise<void>;
    isSaving?: boolean;
}

const TestRunModal: React.FC<Props> = ({
                                           show,
                                           testRun,
                                           onClose,
                                           onSave,
                                           isSaving = false,      // ← розпакували isSaving із дефолтом
                                       }) => {
    const [form, setForm] = React.useState<Partial<TestRunDTO>>(testRun || {});

    React.useEffect(() => {
        setForm(testRun || {});
    }, [testRun]);

    const handleChange = (key: keyof TestRunDTO, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        await onSave(form);
    };

    return (
        <BaseFormModal
            title={form.id ? 'Edit Test Run' : 'New Test Run'}
            show={show}
            onClose={onClose}
            onSave={handleSave}
            form={form}
            isSaving={isSaving}   // тепер це валідно
        >
            {/* Ваші поля форми… */}
        </BaseFormModal>
    );
};

export default TestRunModal;
