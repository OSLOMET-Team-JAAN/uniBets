import React from 'react';
import {useNavigate} from "react-router-dom";
import MyButton from "../components/UI/buttons/MyButton";


const Unauthorized = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <section style={{background: "#2444"}}>
            <h1>Unauthorized</h1>
            <br/>
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <MyButton onClick={goBack}>Go Back</MyButton>
            </div>
        </section>
    );
};

export default Unauthorized;