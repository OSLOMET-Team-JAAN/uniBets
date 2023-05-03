import React, { useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HamburgerBar from "./components/layouts/HamburgerBar";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import './App.css';
import windowEventBus from "./common/WindowEventBus";


function App() {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
       
     useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        windowEventBus.on('resize', handleResize);
        return () => {
            windowEventBus.remove('resize', handleResize)
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
