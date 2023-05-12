import React, { ComponentType, ErrorInfo, ReactNode, Component } from "react";

// Props for the fallback component
interface CustomResponseProps {
    error: Error;
}

// Props for the error boundary component
interface CustomErrorBoundaryProps {
    ResponseComponent: ComponentType<CustomResponseProps>;
    children: ReactNode;
}

// State for the error boundary component
interface CustomErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Error boundary component
export class CustomErrorBoundary extends Component<CustomErrorBoundaryProps, CustomErrorBoundaryState> {
    constructor(props: CustomErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    // Static method to update state when an error occurs
    static getDerivedStateFromError(error: Error | null) {
        // Update state to indicate error
        if (error !== null) {
            return { hasError: true, error };
        }
        return { hasError: false, error: null };
    }

    // Method to handle caught errors
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to an error reporting service
        console.log("Error:", error);
        console.log("Error Info:", errorInfo);
        // Call your API to log the error: logErrorToMyService(error, errorInfo);
    }

    render() {
        const { hasError, error } = this.state;
        const { children, ResponseComponent: ErrorFallback } = this.props;

        if (hasError && error) {
            // Render the fallback component when an error occurs
            return <ErrorFallback error={error} />;
        }

        // Render children normally when no error occurs
        return children;
    }
}

// References:
// - https://dev.to/leandrocoelho1/user-friendly-errors-with-react-error-boundaries-and-fallback-components-mig
// - https://reactjs.org/docs/error-boundaries.html
// - https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991
