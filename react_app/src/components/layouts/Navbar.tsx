import React, {useEffect, useState} from 'react';
import IUser from "../../models/IUser";
import EventBus from "../../common/EventBus";
import {Link} from "react-router-dom";
import {getCurrentUser, logout} from "../../services/auth.service";

const Navbar = () => {
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [showUserBoard, setShowUserBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);


    useEffect(() => {
        const auth = getCurrentUser();
        console.log(auth)
        if (auth) {
            console.log(auth.role)
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
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/home"} className="navbar-brand">
                UbetMe
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>

                {showUserBoard && (
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                            User Page
                        </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/user"} className="nav-link">
                                User Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/dashboard"} className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Page
                            </Link>
                        </li>
                    </div>

                )}
            </div>
            <div style={{marginLeft: "auto"}}>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                LogOut
                            </a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Sign Up
                            </Link>
                        </li>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;