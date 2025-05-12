// src/components/layout/MainLayout.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SideMenu         from '../navigation/SideMenu';
import TestSuiteSidebar from '../testSuite/TestSuiteSidebar';

const MainLayout = ({
                        viewMode,
                        onChangeView,
                        suites,
                        selectedSuite,
                        onSelectSuite,
                        children,             // це правий контент
                    }) => (
    <Row className="h-100">
        {/* 1. Ліва: таби */}
        <Col md={2} className="border-end p-3">
            <SideMenu activeKey={viewMode} onSelect={onChangeView}/>
        </Col>

        {/* 2. Середня: список папок (тільки для testCases) */}
        {viewMode === 'testCases' && (
            <Col md={3} className="border-end p-3">
                <TestSuiteSidebar
                    suites={suites}
                    selected={selectedSuite}
                    onSelect={onSelectSuite}
                />
            </Col>
        )}

        {/* 3. Права: власне контент (children) */}
        <Col md className="p-3 flex-grow-1">
            {children}
        </Col>
    </Row>
);

export default MainLayout;
