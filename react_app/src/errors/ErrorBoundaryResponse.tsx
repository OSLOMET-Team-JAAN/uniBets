import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {NavigateFunction} from "react-router";
import MyButton from "../components/UI/buttons/DangerButton";


const ErrorBoundaryResponse = ({error}: any) => {
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleBack = () => {
        navigate(from, {replace: true});
        window.location.reload();
    }
    
    return (
            <div role="alert">
                <h3>Something went wrong...</h3>
                <h6>{error.message}</h6>
                <p>{error.stack}</p>
                <MyButton
                    onClick={() => handleBack()}
                >BACK</MyButton>
            </div>
        
    );
};

export default ErrorBoundaryResponse;