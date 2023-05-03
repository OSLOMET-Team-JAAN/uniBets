import React, {FC, useEffect, useState } from 'react';
import EventBus from "../../common/EventBus";
import { FiMenu } from "react-icons/fi";
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
    };

    return (
        <nav className="styles.lines">
            <button onClick={handleClick} > <FiMenu style={{ color: 'white', fontSize: '35px' }} />
            </button>
            {showContent &&
                <div >
                    <div className="navbar-nav mx-auto" style={{ fontWeight: 'bold', color: 'white' }}>
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link" style={{ color: 'white' }}>
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
            }
           
            <Link to={"/home"} className="navbar-brand" style={{ fontWeight: 'bold', color: 'white' }}>
                 <img src={Logo} alt="Logo" className={st.image} />
            </Link>
       
             <Link to={"/login"} className={st.st2}
                        onClick={handleClick}
                        style={{ color: 'white' }}>
                        Logout
             </Link>

        </nav>
    );
};

export default HamburgerBar;
