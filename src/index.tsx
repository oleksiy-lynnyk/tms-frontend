import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

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