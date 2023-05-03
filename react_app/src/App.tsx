import React, { useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HamburgerBar from "./components/layouts/HamburgerBar";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import './App.css';


function App() {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
     useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div>
            {screenSize > 768 ? (
                <Navbar />
            ) : (
                <HamburgerBar />
            )}
            <br/>
            <AppRouter/>
            <br/>
            <Footer/>
        </div>
    )
}

export default App;
