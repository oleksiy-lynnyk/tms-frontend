// src/components/common/ErrorBoundary.js

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        // Оновлюємо стан, щоб наступний рендер показав резервний UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Тут можна записати інформацію про помилку
        this.setState({
            error: error,
            errorInfo: errorInfo
        });

        // Також, можна логувати помилку в сервіс моніторингу
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Можна створити будь-який резервний UI
            return (
                <div className="error-boundary-fallback">
                    <h2>Щось пішло не так.</h2>
                    <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                        <summary>Деталі помилки</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                    <button
                        className="btn btn-primary mt-3"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Спробувати знову
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
