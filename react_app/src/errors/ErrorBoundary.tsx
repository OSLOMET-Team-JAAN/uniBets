import React, {ComponentType, ErrorInfo, ReactNode} from "react";

interface ErrorBoundaryProps {
    ResponseComponent: ComponentType<{ error: Error }>,
    children: ReactNode
}

interface State {
    error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {

    state = {error: null, errorMessage: ''};

    static getDerivedStateFromError(error: Error | null) {
        // Update state to render the fallback UI
        if (error !== null)
            return {error: true, errorMessage: error.toString() || ''};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to an error reporting service like Sentry
        console.log({error, errorInfo});
        this.setState({error})
        // if to API logErrorToMyService(error, errorInfo);
    }

    render() {
        const {error} = this.state
        const {children} = this.props;
        const {ResponseComponent} = this.props;

        return error ? <ResponseComponent error={error}/> : children

    }
}

// https://dev.to/leandrocoelho1/user-friendly-errors-with-react-error-boundaries-and-fallback-components-mig
// https://reactjs.org/docs/error-boundaries.html
// https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991