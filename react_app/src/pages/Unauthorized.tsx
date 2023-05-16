import React, {FC, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/buttons/MyButton";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import styles from "../styles/pages/NotFound.module.css";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import {NavigateFunction} from "react-router";
import {clearLocStorage} from "../services/data.service";


const Unauthorized: FC = () => {
    useEffect(() => {
        if(localStorage.getItem("user") != null){
            clearLocStorage();
        }
    },[])
    const navigate: NavigateFunction = useNavigate();
    const goBack = () => {
        navigate(-1);
        if(localStorage.getItem("user") != null){
            clearLocStorage();
        }
    };
    const goToLogin = () => {
        navigate("/login");
        if(localStorage.getItem("user") != null){
            clearLocStorage();
        }
    };
    return (
        <>
            <ErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                <section style={{background: "whitesmoke"}}>
                    <h1 style={{color: "red"}}>Unauthorized</h1>
                    <h4>No authorization found.</h4>
                    <p>This page is not publicaly availabale!</p>
                    <h3>Please login first!</h3>
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