// src/components/common/Header.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
    currentProject?: { name?: string };
};

const Header: React.FC<HeaderProps> = ({ currentProject }) => {
    const location = useLocation();
    let title = "TMS";
    if (location.pathname.includes('/test-cases')) title = "Test Cases";
    else if (location.pathname.includes('/test-runs')) title = "Test Runs";
    else if (location.pathname.includes('/projects')) title = "Projects";
    // breadcrumbs/назва проекту — за бажанням

    return (
        <header className="d-flex align-items-center justify-content-between px-4 py-2 border-bottom"
                style={{ background: "#fff", minHeight: 56 }}>
            <span className="fw-bold fs-4">{title} {currentProject?.name && `/ ${currentProject.name}`}</span>
        </header>
    );
};

export default Header;
