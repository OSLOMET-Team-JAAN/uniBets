import React, {FC, useEffect, useState} from 'react';
import eventBus from "../../common/EventBus";
import {FiMenu} from "react-icons/fi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {Link, useLocation} from "react-router-dom";
import {getCurrentUser, logout} from "../../services/auth.service";
import Logo from "../../styles/images/logo.png";
import st from "../../styles/layout/Hamburger.module.css";
import IUser from "../../models/IUser";


const HamburgerBar: FC = () => {

    const location = useLocation();
    
    //States to control boards and show content
    const [showContent, setShowContent] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
   
    function handleClick() {
        setShowContent(!showContent);
    }

    //Get user after mounting
    useEffect(() => {
        const auth = getCurrentUser();
        if (auth) {
            setCurrentUser(auth);
            setShowUserBoard(auth.role === "USER");
            setShowAdminBoard(auth.role === "ADMIN");
        }

        eventBus.doc.on("logout", logOut);
        
        return () => {
            eventBus.doc.off("logout", logOut);
        };
    }, [location]);

    //Setting states back to their defaults after logout
    const logOut = () => {
        logout();
        setShowUserBoard(false);
        setShowAdminBoard(false);
        setShowContent(false);
        setCurrentUser(undefined);
    };
    
    return (
        <nav className={st.cont}
             data-testid="hamburgerBar"
        >
            <button 
                onClick={handleClick} > 
                <FiMenu 
                    style={{ color: 'white', fontSize: '35px' }} />
            </button>
            {showContent &&
                
                <div className={st.sidebar} >
                    <button 
                        onClick={handleClick} > 
                        <AiOutlineCloseCircle 
                            style={{ color: 'white', fontSize: '35px' }} />
                    </button>
                    <div 
                        className="navbar-nav mx-auto" 
                        style={{ fontWeight: 'bold', color: 'white' }}>
                        <li className="nav-item">
                            <Link 
                                to={"/home"} 
                                onClick={handleClick} className="nav-link" 
                                style={{ color: 'white' }}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                to={"/faq"} 
                                onClick={handleClick}  className="nav-link" 
                                style={{ color: 'white' }}>
                                FAQ
                            </Link>
                        </li>
                        <li 
                            className="nav-item">
                            <Link 
                                to={"/contact"} 
                                onClick={handleClick} 
                                className="nav-link" 
                                style={{ color: 'white' }}>
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
                                    onClick={handleClick} 
                                    className="nav-link" 
                                    style={{ color: 'white' }}>
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
                                    onClick={handleClick}
                                    className="nav-link"
                                    style={{ color: 'white' }}>
                                    Inbox
                                </Link>
                            </li>
                            <li 
                                className="nav-item">
                                <Link 
                                    to={"/dashboard"} 
                                    onClick={handleClick} 
                                    className="nav-link" 
                                    style={{ color: 'white' }}>
                                    Dashboard
                                </Link>
                            </li>
                            <li 
                                className="nav-item">
                                <Link 
                                    to={"/admin"} 
                                    onClick={handleClick} 
                                    className="nav-link" 
                                    style={{ color: 'white' }}>
                                    Admin Page
                                </Link>
                            </li>
                        </div>
                    )}
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
                                        onClick={handleClick}
                                        className="nav-link"
                                        style={{ color: 'white' }}
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
                                        onClick={handleClick}
                                        style={{ color: 'white' }}>
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={"/register"}
                                        onClick={handleClick}
                                        className="nav-link"
                                        style={{ color: 'white' }}>
                                        SignUp
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
                </div>
            }
           
            {currentUser 
                ?
                (
                    <>
                        <Link
                            to={"/home"}
                            className="navbar-brand"
                            style={{ fontWeight: 'bold', color: 'white' }}>
                            <img
                                src={Logo}
                                alt="Logo"
                                className={st.image} />
                        </Link>
                        <Link
                            to={"/login"}
                            className={st.st2}
                            onClick={logOut}
                            style={{ color: 'white' }}
                        >
                            LogOut
                        </Link>
                    </>
                ) 
                :
                (
                    <>
                        <Link
                            to={"/home"}
                            className="navbar-brand"
                            style={{ fontWeight: 'bold', color: 'white' }}>
                            <img
                                src={Logo}
                                alt="Logo"
                                className={st.image} />
                        </Link>
                        <Link
                            to={"/login"}
                            className={st.st2}
                            style={{ color: 'white' }}
                        >
                            Login
                        </Link>
                    </>
                )
            }

        </nav>
    );
};

export default HamburgerBar;
