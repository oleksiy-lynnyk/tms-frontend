import React, { useEffect, useState } from 'react';
import { getAllTestCases } from '../../api/testCaseApi';
import { addTestCaseToSuite } from '../../api/testSuiteApi';

const SuiteCaseManager = ({ suiteId, onClose }) => {
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    getAllTestCases().then(res => setTestCases(res.data));
  }, []);

  const handleAddCase = async (caseId) => {
    await addTestCaseToSuite(suiteId, caseId);
    alert('Case added to suite!');
  };

  return (
    <div className="border rounded p-3 mt-3">
      <h6>Available Test Cases</h6>
      <ul className="list-group">
        {testCases.map(tc => (
          <li key={tc.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{tc.title}</strong> — {tc.priority}
            </span>
            <button className="btn btn-sm btn-success" onClick={() => handleAddCase(tc.id)}>Add</button>
          </li>
        ))}
      </ul>
      <button className="btn btn-secondary mt-3" onClick={onClose}>Close</button>
    </div>
  );
};

export default SuiteCaseManager;
