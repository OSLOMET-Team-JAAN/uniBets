import React, {FC, useEffect, useState } from 'react';
import EventBus from "../../common/DocEventBus";
import { FiMenu } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/auth.service";
import Logo from "../../styles/images/logo.png";
import st from "../../styles/layout/Hamburger.module.css";



const HamburgerBar: FC = () => {

    const [showContent, setShowContent] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);

   
    function handleClick() {
        setShowContent(!showContent);
    }


    useEffect(() => {
        const auth = getCurrentUser();
        if (auth) {
            setShowUserBoard(auth.role === "USER");
            setShowAdminBoard(auth.role === "ADMIN");
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);

    const logOut = () => {
        logout();
        setShowUserBoard(false);
        setShowAdminBoard(false);
        setShowContent(false);
    };

    return (
        <div className={st.cont} >
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
                            <Link to={"/contact"} onClick={handleClick} className="nav-link" 
                                  style={{ color: 'white' }}>
                                Contact Us
                            </Link>
                        </li>
                    </div>
                    {showUserBoard && (
                        <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                            <li className="nav-item">
                                <Link to={"/user"} onClick={handleClick} className="nav-link" style={{ color: 'white' }}>
                                    User Page
                                </Link>
                            </li>
                        </div>
                    )}

                    {showAdminBoard && (
                        <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                            <li className="nav-item">
                                <Link to={"/dashboard"} onClick={handleClick} className="nav-link" style={{ color: 'white' }}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/admin"} onClick={handleClick} className="nav-link" style={{ color: 'white' }}>
                                    Admin Page
                                </Link>
                            </li>
                        </div>

                    )}

                </div>
            }
           
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

        </div>
    );
};

export default HamburgerBar;
