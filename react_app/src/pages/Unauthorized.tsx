import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/buttons/MyButton";
import { CustomErrorBoundary } from '../errors/CustomErrorBoundary';
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import styles from "../styles/pages/NotFound.module.css";


const Unauthorized: FC = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <>
            <CustomErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                <section style={{background: "#2444"}}>
                    <h1>Unauthorized</h1>
                    <br/>
                    <h4 style={{color: "red"}}>You do not have access to the requested page !</h4>
                    <div className="flexGrowContainer">
                        <img 
                            className={styles.notFound} 
                            alt="unauthorized" 
                            src={require('../../src/styles/images/modal_attention.jpeg')}/>
                        <MyButton onClick={goBack}>Go Back</MyButton>
                    </div>
                </section>
            </CustomErrorBoundary>
        </>
    );
};

export default Unauthorized;