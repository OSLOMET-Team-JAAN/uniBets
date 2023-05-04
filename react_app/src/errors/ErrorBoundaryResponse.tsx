import React, {FC} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {NavigateFunction} from "react-router";
import MyDangerButton from "../components/UI/buttons/DangerButton";
import st from "../styles/pages/Error.module.css";


const ErrorBoundaryResponse: FC = ({error}: any) => {
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleBack = () => {
        navigate(from, {replace: true});
        window.location.reload();
    }

    return (
        <div role="alert" className={st.sect}>
            <h3>Something went wrong...</h3>
            <h6>{error.message}</h6>
            <p>{error.stack}</p>
            <MyDangerButton
                onClick={() => handleBack()}
            >BACK</MyDangerButton>
        </div>

    );
};

export default ErrorBoundaryResponse;