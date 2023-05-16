import React, {FC, useEffect, useState} from 'react';
import IUser from "../../models/IUser";
import eventBus from "../../common/EventBus";
import {Link, useLocation} from "react-router-dom";
import {getCurrentUser, logout} from "../../services/auth.service";
import Logo from "../../styles/images/logo.png";
import styles from "../../styles/layout/Navbar.module.css";

const Navbar: FC = () => {
    const location = useLocation();
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

        eventBus.doc.on("logout", logOut);

        return () => {
            eventBus.doc.off("logout", logOut);
        };
    }, [location]);

    const logOut = () => {
        logout();
        setShowUserBoard(false)
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };

    return (
        <nav
            className="navbar navbar-expand "
            style={{ backgroundColor: '#0B5B7D', width: "auto" }}
            data-testid="navbar"
        >
            <div
                className="container-fluid">
                <img
                    src={Logo}
                    alt="Logo"
                    className={styles.image} />
                <Link
                    to={"/home"}
                    className="navbar-brand"
                    style={{ fontWeight: 'bold', color: 'white'}}
                >
                    Game Fixing
                </Link>
                <div
                    className="navbar-nav mx-auto"
                    style={{ fontWeight: 'bold', color: 'white' }}>
                    <li
                        className="nav-item">
                        <Link
                            to={"/home"}
                            className="nav-link"
                            style={{ color: 'white' }}
                            data-testid="homePage-link"
                        >
                            Home
                        </Link>
                    </li>
                    <li
                        className="nav-item">
                        <Link
                            to={"/faq"}
                            className="nav-link"
                            style={{ color: 'white' }}
                            data-testid="faqPage-link"
                        >
                            FAQ
                        </Link>
                    </li>
                    <li
                        className="nav-item">
                        <Link
                            to={"/contact"}
                            className="nav-link"
                            style={{ color: 'white' }}
                            data-testid="contactPage-link"
                        >
                            Contact Us
                        </Link>
                    </li>
                </div>

                {showUserBoard && (
                    <div
                        className="navbar-nav mx-auto"
                        style={{ fontWeight: 'bold', color: 'white' }}>
                        <li
                            className="nav-item">
                            <Link
                                to={"/user"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="userPage-link"
                            >
                                User Page
                            </Link>
                        </li>
                    </div>
                )}

                {showAdminBoard && (
                    <div
                        className="navbar-nav mx-auto"
                        style={{ fontWeight: 'bold', color: 'white' }}>
                        <li
                            className="nav-item">
                            <Link
                                to={"/inbox"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="inboxPage-link"
                            >
                                Inbox
                            </Link>
                        </li>
                        <li
                            className="nav-item">
                            <Link
                                to={"/dashboard"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="dashboardPage-link"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li
                            className="nav-item">
                            <Link
                                to={"/admin"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="adminPage-link"
                            >
                                Admin Page
                            </Link>
                        </li>
                    </div>
                )}
            </div>
            <div
                className="navbar-nav ml-auto"
                style={{ fontWeight: 'bold', color: 'white' }}>
                {currentUser ? (
                    <div
                        className="navbar-nav">
                        <li
                            className="nav-item">
                            <Link
                                to={"/profile"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="profilePage-link"
                            >
                                {currentUser.username}
                            </Link>
                        </li>
                        <li
                            className="nav-item">
                            <Link
                                to={"/login"}
                                className="nav-link"
                                onClick={logOut}
                                style={{ color: 'white' }}>
                                LogOut
                            </Link>
                        </li>
                    </div>
                ) : (
                    <div
                        className="navbar-nav">
                        <li
                            className="nav-item">
                            <Link
                                to={"/login"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="loginPage-link"
                            >
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to={"/register"}
                                className="nav-link"
                                style={{ color: 'white' }}
                                data-testid="registrationPage-link"
                            >
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
//https://www.bezkoder.com/react-typescript-authentication-example/