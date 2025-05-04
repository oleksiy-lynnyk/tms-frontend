import React, { useEffect, useState } from 'react';
import { getAllSuites } from './api/testSuiteApi';
import TestSuiteSidebar from './components/suites/TestSuiteSidebar';
import SuiteCaseView from './components/suites/SuiteCaseView';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [suites, setSuites] = useState([]);
  const [selectedSuite, setSelectedSuite] = useState(null);

  const loadSuites = async () => {
    const res = await getAllSuites();
    setSuites(res.data);
    if (!selectedSuite && res.data.length) {
      setSelectedSuite(res.data[0]);
    }
  };

  useEffect(() => {
    loadSuites();
  }, []);

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <TestSuiteSidebar
        suites={suites}
        onSelect={setSelectedSuite}
        selectedId={selectedSuite?.id}
      />
      <SuiteCaseView suite={selectedSuite} />
    </div>
  );
}

export default App;
