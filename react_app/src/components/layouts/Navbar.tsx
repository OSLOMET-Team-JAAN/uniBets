import React, {useEffect, useState} from 'react';
import IUser from "../../models/IUser";
import EventBus from "../../common/EventBus";
import {Link} from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";
import Logo from "../../styles/images/logo.png";
import styles from "../../styles/layout/Navbar.module.css";
import { hover } from '@testing-library/user-event/dist/hover';

const Navbar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [showUserBoard, setShowUserBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);


    useEffect(() => {
        const auth = getCurrentUser();
        if (auth) {
            setCurrentUser(auth);
            setShowUserBoard(auth.role === "USER")
            setShowAdminBoard(auth.role === "ADMIN");
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        logout();
        setShowUserBoard(false)
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    return (
        <nav className="navbar navbar-expand " style={{ backgroundColor: '#0B5B7D', width:"auto" }}>
            <div className="container-fluid">
                <Link to={"/home"} className="navbar-brand" style={{ fontWeight: 'bold', color: 'white' }}>
                    <p > Game Fixing <img src={Logo} alt="Logo" className={styles.image} /> </p>
                    
                     
                </Link>

                <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link" style={{ color: 'white' }} >
                        Home
                    </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/faq"} className="nav-link" style={{ color: 'white' }}>
                            FAQ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/contact"} className="nav-link" style={{ color: 'white' }}>
                            Contact Us
                        </Link>
                    </li>
                </div>

                {showUserBoard && (
                    <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                    <li className="nav-item">
                            <Link to={"/user"} className="nav-link" style={{ color: 'white' }}>
                            User Page
                        </Link>
                    </li>
                    </div>
                )}

                {showAdminBoard && (
                    <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link" style={{ color: 'white'}}>
                                User Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link" style={{ color: 'white' }}>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link" style={{ color: 'white' }}>
                                Admin Page
                            </Link>
                        </li>
                    </div>

                )}
            </div>
            <div className="navbar-nav ml-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                {currentUser ? (
                    <div className="navbar-nav">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link" style={{ color: 'white' }} >
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut} style={{ color: 'white' }}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav">
                        <li className="nav-item">
                                <Link to={"/login"} className="nav-link" style={{ color: 'white' }}>
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                                <Link to={"/register"} className="nav-link" style={{ color: 'white' }}>
                                SignUp
                            </Link>
                        </li>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
