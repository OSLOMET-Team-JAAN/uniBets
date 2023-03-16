import React from "react";
import {getCurrentUser} from "../services/auth.service";
import {Link} from "react-router-dom";
import st from '../styles/Profile.module.css';

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();
    return (
        <div className={st.container}>

            <header>

                <h1> Welcome <strong>{currentUser.username}</strong></h1>

                <img className={st.profileImg} alt="bob" src={require('../../src/styles/images/bob.jpg')}/>

            </header>
            <p>
                <strong>Token:&nbsp;</strong> {JSON.stringify(currentUser.token).substring(16, 50)} ...
            </p>
            <p>
                <strong>Email:&nbsp;</strong> {currentUser.email}
            </p>
            <strong>Authorities: &nbsp;</strong>{currentUser.role}
            <div className="flexGrow">
                <Link to="/home">Back to Home Page</Link>
            </div>
        </div>

    );
};

export default Profile;


