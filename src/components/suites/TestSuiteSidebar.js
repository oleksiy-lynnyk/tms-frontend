import React from 'react';

const TestSuiteSidebar = ({ suites, onSelect, selectedId }) => {
  return (
    <div className="border-end pe-3" style={{ minWidth: '220px' }}>
      <h5 className="mt-2">Folders</h5>
      <ul className="list-group">
        {suites.map(suite => (
          <li
            key={suite.id}
            className={`list-group-item list-group-item-action ${selectedId === suite.id ? 'active' : ''}`}
            onClick={() => onSelect(suite)}
            style={{ cursor: 'pointer' }}
          >
            📁 {suite.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestSuiteSidebar;
