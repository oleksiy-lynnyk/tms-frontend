import React, { useState } from 'react';
import TestSuiteSidebar from './components/testSuite/TestSuiteSidebar';
import TestCaseView from './components/testCase/TestCaseView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

const App = () => {
    const [selectedSuite, setSelectedSuite] = useState(null);

    return (
        <div className="app-container">
            <div className="sidebar-container">
                <TestSuiteSidebar
                    selected={selectedSuite}
                    onSelectSuite={setSelectedSuite}
                />
            </div>
                        <div className="content-container">
                            {selectedSuite ? (
                                <TestCaseView suite={selectedSuite} />
                            ) : (
                                <div
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ height: '100%' }}
                                >
                                    <p className="text-muted">
                                        Оберіть Test Suite, щоб побачити тест-кейси
                                    </p>
                                </div>
                            )}
                        </div>
        </div>
    );
};

export default App;
