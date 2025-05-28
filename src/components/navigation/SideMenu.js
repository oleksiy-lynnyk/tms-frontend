// src/components/navigation/SideMenu.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FaFolder, FaPlay, FaChartBar } from 'react-icons/fa';

export default function SideMenu({ narrow, currentProjectName }) {
    const location = useLocation();
    const isProjectsPage = location.pathname === '/projects';

    // Приховуємо меню на сторінці всіх проектів
    if (isProjectsPage) return null;

    return (
        <div className="d-flex flex-column h-100 justify-content-between" style={{ minHeight: '100vh', background: '#fff', borderRight: '1px solid #eee' }}>
            <div>
                {/* Назва проекту зверху */}
                {currentProjectName && (
                    <div className="px-3 py-3 border-bottom fw-bold fs-5" style={{ letterSpacing: 0.2 }}>
                        {currentProjectName}
                    </div>
                )}
                <Nav variant="pills" className="flex-column pt-2">
                    <Nav.Link as={NavLink} to="/suites" className="d-flex align-items-center">
                        <FaFolder />
                        {!narrow && <span className="ms-2">Test Suites</span>}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/test-runs" className="d-flex align-items-center">
                        <FaPlay />
                        {!narrow && <span className="ms-2">Test Runs</span>}
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/reports" className="d-flex align-items-center">
                        <FaChartBar />
                        {!narrow && <span className="ms-2">Reports</span>}
                    </Nav.Link>
                </Nav>
            </div>
            {/* Projects - в самому низу, просто текст, без іконки */}
            <div className="border-top p-3 text-center" style={{ cursor: 'pointer' }}>
                <span className="fw-bold" onClick={() => window.location.href = '/projects'}>
                    Projects
                </span>
            </div>
        </div>
    );
}
