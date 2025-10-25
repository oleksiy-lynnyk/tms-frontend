import React from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import type { TestStepDTO } from '@/entities/testCase/types/testCaseTypes';

interface Props {
    steps: TestStepDTO[];
    onChange: (steps: TestStepDTO[]) => void;
}

const emptyStep = (orderIndex: number): TestStepDTO => ({
    action: '',
    expectedResult: '',
    orderIndex,
    id: undefined,
});

export default function TestCaseStepsEditor({ steps, onChange }: Props) {
    const handleStepChange = (i: number, field: keyof TestStepDTO, value: string) => {
        const updated = steps.map((step, idx) =>
            idx === i ? { ...step, [field]: value } : step
        );
        onChange(updated);
    };

    const addStep = () => {
        onChange([...steps, emptyStep(steps.length)]);
    };

    const removeStep = (i: number) => {
        const updated = steps.filter((_, idx) => idx !== i)
            .map((step, idx) => ({ ...step, orderIndex: idx }));
        onChange(updated);
    };

    return (
        <div>
            <div className="mb-2 fw-semibold">Test Steps</div>
            {steps.length === 0 && (
                <div className="mb-2 text-muted">
                    No steps yet. Add your first step.
                </div>
            )}
            {steps.map((step, i) => (
                <Row className="mb-2" key={i}>
                    <Col>
                        <Form.Control
                            placeholder="Action"
                            value={step.action}
                            onChange={e => handleStepChange(i, 'action', e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            placeholder="Expected result"
                            value={step.expectedResult}
                            onChange={e => handleStepChange(i, 'expectedResult', e.target.value)}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => removeStep(i)}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
            ))}
            <Button size="sm" variant="outline-primary" onClick={addStep}>
                + Add Step
            </Button>
        </div>
    );
}
