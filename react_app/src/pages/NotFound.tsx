import React from 'react';
import styles from '../styles/pages/NotFound.module.css';
import {Link} from "react-router-dom";

const NotFound = () => {

    return (

        <article className={styles.wrapper}>
            <h1>404... PAGE NOT FOUND</h1>
            <img className={styles.notFound} alt="404_pic" src={require('../../src/styles/images/404_.jpg')}/>
            <div className="flexGrow">
                <Link to="/home">Back to Home Page</Link>
            </div>
        </article>

    );
};

export default NotFound;