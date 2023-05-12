import React, {FC} from 'react';
import styles from '../styles/pages/NotFound.module.css';
import {Link} from "react-router-dom";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {CustomErrorBoundary} from '../errors/CustomErrorBoundary';

const NotFound= () => {
    return (
            <div data-testid="notFoundPage">
                <CustomErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                    <article 
                        className={styles.wrapper}>
                        <h1>404... PAGE NOT FOUND</h1>
                        <img 
                            className={styles.notFound} 
                            alt="404_pic" 
                            src={require('../../src/styles/images/404_.jpg')}/>
                        <div 
                            className="flexGrowContainer">
                            <Link 
                                to="/home">Back to Home Page</Link>
                        </div>
                    </article>
                </CustomErrorBoundary>
            </div>
    );
};

export default NotFound;