// src/components/navigation/SideMenu.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaFolder, FaPlay, FaChartBar } from 'react-icons/fa';

const items = [
    { key: 'testCases', label: 'Test Cases', icon: FaFolder },
    { key: 'testRuns',  label: 'Test Runs',  icon: FaPlay },
    { key: 'reports',   label: 'Reports',    icon: FaChartBar },
];

const SideMenu = ({ activeKey, onSelect }) => (
    <Nav variant="pills" className="flex-column" activeKey={activeKey} onSelect={onSelect}>
        {items.map(({ key, label, icon: Icon }) => (
            <Nav.Link eventKey={key} key={key}>
                <Icon className="me-2" />
                {label}
            </Nav.Link>
        ))}
    </Nav>
);

export default SideMenu;
