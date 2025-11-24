import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

// Polyfill for crypto.randomUUID() for older browsers
if (!crypto.randomUUID) {
    crypto.randomUUID = function () {
        return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };
}

const container = document.getElementById('root');
if (!container) throw new Error('Root container "#root" not found');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ToastProvider>
                <App />
            </ToastProvider>
        </BrowserRouter>
    </React.StrictMode>
);