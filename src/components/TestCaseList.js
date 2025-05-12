import React, { useEffect, useState } from 'react';
import { getAllTestCases, deleteTestCase } from '../api/testCaseApi';

const TestCaseList = ({ reloadTrigger, onEditClick }) => {
  const [testCases, setTestCases] = useState([]);

  const loadTestCases = async () => {
    const response = await getAllTestCases();
    setTestCases(response.data);
  };

  useEffect(() => {
    loadTestCases();
  }, [reloadTrigger]);

  const handleDelete = async (id) => {
    await deleteTestCase(id);
    loadTestCases();
  };

  return (
    <div>
      <h2 className="mb-3">Test Cases</h2>
      <ul className="list-group">
        {testCases.map(tc => (
          <li key={tc.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <strong>{tc.title}</strong> — {tc.priority}<br />
              <em>{tc.description}</em><br />
              <small>Tags: {tc.tags}</small>
            </div>
            <div>
              <button onClick={() => onEditClick(tc)} className="btn btn-sm btn-warning me-2">Edit</button>
              <button onClick={() => handleDelete(tc.id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCaseList;
