import React from "react";

class InternalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error) {
        // eslint-disable-next-line no-console
        console.error("Render error captured by boundary:", error);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-fallback" role="alert">
                    <h2>Something went wrong</h2>
                    <p>Please reload the page and try again.</p>
                    <button type="button" onClick={this.handleReload}>Reload</button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default function AppErrorBoundary({ children }) {
    return <InternalErrorBoundary>{children}</InternalErrorBoundary>;
}