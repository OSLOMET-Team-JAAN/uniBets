import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/buttons/MyButton";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import styles from "../styles/pages/NotFound.module.css";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import {NavigateFunction} from "react-router";
import {clearLocStorage} from "../services/data.service";


const Unauthorized: FC = () => {
    
    //Redirection
    const navigate: NavigateFunction = useNavigate();
    
    const goBack = () => {
        navigate(-1);
    };
    
    const goToLogin = () => {
        navigate("/login");
        //Remove auth if goes to login
        if(localStorage.getItem("user") != null){
                    clearLocStorage();
                }
    };
    return (
        <>
            <ErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                <br/>
                <section style={{background: "whitesmoke"}}>
                    <h1 style={{color: "red"}}>Unauthorized.</h1>
                    <p>You are not authorized to see that page!</p>
                    <h2>Please go back or login!</h2>
                    <div className="flexGrowContainer">
                        <img 
                            className={styles.notFound} 
                            alt="unauthorized" 
                            src={require('../../src/styles/images/modal_attention.jpeg')}/>
                        <MyButton onClick={goBack}>Go Back</MyButton>
                        <MyButton onClick={goToLogin}>Login</MyButton>
                    </div>
                </section>
            </ErrorBoundary>
        </>
    );
};

export default Unauthorized;