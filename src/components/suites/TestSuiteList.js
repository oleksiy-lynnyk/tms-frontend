import React, { useEffect, useState } from 'react';
import { getAllSuites } from '../../api/testSuiteApi';
import { deleteTestCase } from '../../api/testCaseApi';
import EditTestCaseModal from './EditTestCaseModal';
import AddTestCaseModal from './AddTestCaseModal';

const SuiteCaseView = ({ suite }) => {
  const [currentSuite, setCurrentSuite] = useState(suite);
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setCurrentSuite(suite);
  }, [suite]);

  const refreshSuite = async () => {
    const all = await getAllSuites();
    const updated = all.data.find(s => s.id === suite.id);
    setCurrentSuite(updated);
  };

  const openEditModal = (tc) => {
    setSelectedCase(tc);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this test case?');
    if (confirm) {
      await deleteTestCase(id);
      refreshSuite();
    }
  };

  if (!currentSuite) {
    return <div className="p-3">Select a test suite to view its cases.</div>;
  }

  return (
    <div className="p-3 flex-grow-1">
      <h4>{currentSuite.name}</h4>
      <p>{currentSuite.description}</p>

      <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>
        + Add Test Case
      </button>

      <h6>Test Cases:</h6>
      {currentSuite.testCases?.length ? (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Steps</th>
                <th>Expected Result</th>
                <th>Priority</th>
                <th>Tags</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentSuite.testCases.map(tc => (
                <tr key={tc.id}>
                    <td>TC-{tc.id}</td>
                    <td>{tc.title}</td>
                    <td>{tc.description}</td>
                    <td style={{ whiteSpace: 'pre-wrap' }}>{tc.steps}</td>
                    <td>{tc.expectedResult}</td>
                    <td>{tc.priority}</td>
                    <td>{tc.tags}</td>
                    <td>
                        <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => openEditModal(tc)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                                setCaseToDelete(tc);
                                setShowDeleteModal(true);
                            }}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>

        </table>
      ) : (
        <p className="text-muted">No test cases in this suite yet.</p>
      )}

      {/* Модальне вікно редагування */}
      <EditTestCaseModal
        show={showModal}
        onClose={() => setShowModal(false)}
        testCase={selectedCase}
        onSave={refreshSuite}
      />

      {/* Модальне вікно додавання */}
      <AddTestCaseModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        suiteId={currentSuite.id}
        onSave={refreshSuite}
      />
    </div>
  );
};

export default SuiteCaseView;
